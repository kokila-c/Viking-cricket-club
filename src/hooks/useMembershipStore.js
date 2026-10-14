import { useEffect, useState } from "react";
import {
  STORAGE_KEY,
  createApplication,
  emptyState,
  loadState,
  persistState,
  reviewApplication,
} from "../services/membershipStore";

function read() {
  try {
    return loadState(window.localStorage);
  } catch {
    return {
      state: emptyState(),
      error:
        "Site storage is blocked. Demo applications cannot be saved in this browser.",
    };
  }
}

export default function useMembershipStore() {
  const [initial] = useState(read);
  const [state, setState] = useState(initial.state);
  const [error, setError] = useState(initial.error);
  useEffect(() => {
    function sync(event) {
      if (event.key === STORAGE_KEY || event.key === null) {
        const next = read();
        setState(next.state);
        setError(next.error);
      }
    }
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function commit(next) {
    try {
      persistState(window.localStorage, next);
      setState(next);
      setError("");
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }
  return {
    state,
    error,
    saveDraft(draft) {
      const next = { ...state, draft };
      // Editing remains possible if storage is unavailable; submission fails explicitly.
      try {
        commit(next);
      } catch {
        setState(next);
      }
    },
    submit(data) {
      const next = createApplication(state, data);
      commit(next.state);
      return next.application;
    },
    review(id, status, note) {
      commit(reviewApplication(state, id, status, note));
    },
    reset() {
      commit(emptyState());
    },
  };
}
