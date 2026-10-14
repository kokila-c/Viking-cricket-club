import {
  emptyApplication,
  normalizeApplication,
  validateApplication,
} from "../data/membership.js";

export const STORAGE_KEY = "viking-cricket-prototype-v1";
export const emptyState = () => ({
  version: 1,
  applications: [],
  draft: emptyApplication(),
  lastSubmittedId: null,
});
export const storageMessage =
  "Your browser could not save the demo. Enable site storage or try a regular browser window, then retry. Nothing was submitted.";

export function loadState(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return { state: emptyState(), error: "" };
    const value = JSON.parse(raw);
    if (value.version !== 1 || !Array.isArray(value.applications))
      throw new Error("Invalid saved demo");
    const applications = value.applications
      .filter(
        (a) =>
          a &&
          typeof a.id === "string" &&
          ["pending", "approved", "rejected"].includes(a.status) &&
          typeof a.createdAt === "string" &&
          Number.isFinite(Date.parse(a.createdAt)) &&
          Object.keys(validateApplication(a)).length === 0,
      )
      .map((a) => ({
        ...normalizeApplication(a),
        id: a.id,
        status: a.status,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
        reviewNote: typeof a.reviewNote === "string" ? a.reviewNote : "",
      }));
    const draft =
      value.draft && typeof value.draft === "object"
        ? { ...emptyApplication(), ...normalizeApplication(value.draft) }
        : emptyApplication();
    if (draft.plan === "family" && !draft.members.length)
      draft.members = emptyApplication().members;
    return {
      state: {
        version: 1,
        applications,
        draft,
        lastSubmittedId: applications.some(
          (a) => a.id === value.lastSubmittedId,
        )
          ? value.lastSubmittedId
          : null,
      },
      error: "",
    };
  } catch {
    return {
      state: emptyState(),
      error:
        "Saved demo data could not be opened. You can reset this device’s demo from the review screen. No club data is affected.",
    };
  }
}

export function persistState(storage, state) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    throw new Error(storageMessage);
  }
  return state;
}

export function createApplication(
  state,
  raw,
  { id, now = new Date().toISOString() } = {},
) {
  const data = normalizeApplication(raw);
  if (Object.keys(validateApplication(data)).length)
    throw new Error("Please complete the required fields.");
  if (
    state.applications.some(
      (a) =>
        a.status !== "rejected" &&
        a.email === data.email &&
        a.fullName.toLowerCase() === data.fullName.toLowerCase(),
    )
  ) {
    throw new Error(
      "An active demo application for this name and email already exists. Use Track status to view it.",
    );
  }
  const reference =
    id ?? `VCC-${globalThis.crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  if (state.applications.some((a) => a.id === reference))
    throw new Error("Please retry to generate a new application reference.");
  const application = {
    ...data,
    id: reference,
    status: "pending",
    createdAt: now,
    updatedAt: now,
    reviewNote: "",
  };
  return {
    state: {
      ...state,
      applications: [application, ...state.applications],
      draft: emptyApplication(),
      lastSubmittedId: reference,
    },
    application,
  };
}

export function reviewApplication(
  state,
  id,
  status,
  note = "",
  now = new Date().toISOString(),
) {
  if (!["pending", "approved", "rejected"].includes(status))
    throw new Error("Invalid review status.");
  if (!state.applications.some((a) => a.id === id))
    throw new Error("This application no longer exists.");
  if (note.trim().length > 500)
    throw new Error("Keep the review note under 500 characters.");
  return {
    ...state,
    applications: state.applications.map((a) =>
      a.id === id
        ? { ...a, status, reviewNote: note.trim(), updatedAt: now }
        : a,
    ),
  };
}
