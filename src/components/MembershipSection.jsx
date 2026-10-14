import { useRef, useState } from "react";
import {
  emptyApplication,
  emptyMember,
  experiences,
  plans,
  teamOptions,
  validateApplication,
} from "../data/membership";

const money = (fee) => `${fee} kr`;
const statusLabel = (status) => status[0].toUpperCase() + status.slice(1);

function Field({ id, label, error, children, hint }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <small id={`${id}-hint`}>{hint}</small>}
      {error && (
        <small className="field-error" id={`${id}-error`}>
          {error}
        </small>
      )}
    </div>
  );
}

export function ApplicationSummary({ application }) {
  const plan = plans.find((p) => p.id === application.plan);
  return (
    <dl className="application-summary">
      <div>
        <dt>Membership</dt>
        <dd>
          {plan?.name} · {money(plan?.fee)} / year (demo)
        </dd>
      </div>
      <div>
        <dt>
          {application.plan === "family" ? "Primary contact" : "Applicant"}
        </dt>
        <dd>
          {application.fullName} ·{" "}
          {application.ageGroup === "junior" ? "Under 18" : "18 or older"}
        </dd>
      </div>
      <div>
        <dt>Contact email</dt>
        <dd>{application.email}</dd>
      </div>
      <div>
        <dt>Phone</dt>
        <dd>{application.phone}</dd>
      </div>
      <div>
        <dt>Town / city</dt>
        <dd>{application.city}</dd>
      </div>
      <div>
        <dt>Team interest</dt>
        <dd>{application.team}</dd>
      </div>
      <div>
        <dt>Experience</dt>
        <dd>{application.experience}</dd>
      </div>
      {application.ageGroup === "junior" && (
        <div>
          <dt>Parent / guardian</dt>
          <dd>{application.guardianName}</dd>
        </div>
      )}
      {application.plan === "family" && (
        <div>
          <dt>Additional family members</dt>
          <dd>
            <ul>
              {application.members.map((m, i) => (
                <li key={i}>
                  {m.name} · {m.ageGroup === "junior" ? "Under 18" : "18+"} ·{" "}
                  {m.team}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      )}
    </dl>
  );
}

export default function MembershipSection({
  store,
  onPrivacy,
  onReview,
  forceApply = false,
}) {
  const { state, saveDraft, submit } = store;
  const [view, setView] = useState(
    !forceApply && state.lastSubmittedId ? "status" : "apply",
  );
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const latest = state.applications.find((a) => a.id === state.lastSubmittedId);
  const [lookup, setLookup] = useState({
    reference: latest?.id ?? "",
    email: latest?.email ?? "",
  });
  const [foundId, setFoundId] = useState(latest?.id ?? null);
  const [lookupError, setLookupError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const headingRef = useRef(null);
  const form = state.draft;
  const found = state.applications.find((a) => a.id === foundId);

  function focusHeading() {
    queueMicrotask(() => headingRef.current?.focus());
  }
  function setField(key, value) {
    const next = {
      ...form,
      [key]: value,
      consent: key === "consent" ? value : false,
    };
    if (key === "plan" && value === "family") {
      next.ageGroup = "adult";
      if (!next.members.length) next.members = [emptyMember()];
    }
    saveDraft(next);
    setErrors({ ...errors, [key]: undefined });
    setSubmitError("");
  }
  function setMember(index, key, value) {
    saveDraft({
      ...form,
      consent: false,
      members: form.members.map((m, i) =>
        i === index ? { ...m, [key]: value } : m,
      ),
    });
    setErrors({
      ...errors,
      [`member-${index}-${key === "ageGroup" ? "age" : key}`]: undefined,
    });
  }
  function nextStep(event) {
    event.preventDefault();
    const nextErrors =
      step === 1 ? {} : validateApplication(form, { requireConsent: false });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      focusHeading();
      return;
    }
    setStep(step + 1);
    focusHeading();
  }
  function submitForm(event) {
    event.preventDefault();
    setSubmitError("");
    const nextErrors = validateApplication(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      focusHeading();
      return;
    }
    try {
      const application = submit(form);
      setLookup({ reference: application.id, email: application.email });
      setFoundId(application.id);
      setView("status");
      setStep(1);
      setSubmitted(true);
      setCopied(false);
      setCopyError("");
      focusHeading();
    } catch (err) {
      setSubmitError(err.message);
      focusHeading();
    }
  }
  function fillSample() {
    saveDraft({
      ...emptyApplication(),
      plan: form.plan,
      fullName: "Alex Demo",
      email: `alex.${state.applications.length + 1}@example.test`,
      phone: "+47 000 00 000",
      city: "Stavanger",
      team: form.team,
      members: [
        { name: "Sam Demo", ageGroup: "junior", team: "Junior Cricket" },
      ],
    });
    setErrors({});
    setSubmitError("");
  }
  function track(event) {
    event.preventDefault();
    setSubmitted(false);
    setCopied(false);
    setCopyError("");
    const match = state.applications.find(
      (a) =>
        a.id.toUpperCase() === lookup.reference.trim().toUpperCase() &&
        a.email === lookup.email.trim().toLowerCase(),
    );
    setFoundId(match?.id ?? null);
    setLookupError(
      match
        ? ""
        : "No matching demo application on this device. Check the reference and email, or submit a new demo application.",
    );
  }
  const fieldProps = (key) => ({
    id: key,
    name: key,
    value: form[key],
    required: true,
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    onChange: (event) => setField(key, event.target.value),
  });

  return (
    <section
      className="join-section"
      id="membership"
      aria-labelledby="membership-title"
    >
      <div className="join-container">
        <div className="membership-heading">
          <div>
            <p className="section-eyebrow">JOIN VIKING</p>
            <h2 id="membership-title">Your place in the game.</h2>
            <p className="join-intro">
              Experienced player or taking your first swing? There’s a place for
              you here. Come to compete, learn or simply belong.
            </p>
          </div>
          <span className="small-tag">MEMBERSHIP · V1 DEMO</span>
        </div>
        <div className="membership-layout">
          <aside className="membership-aside">
            <p className="eyebrow">PLAY · LEARN · BELONG</p>
            <h3>
              One club.
              <br />
              Many possibilities.
            </h3>
            <ul className="benefit-list">
              <li>Men’s, women’s & junior cricket</li>
              <li>Beginners warmly welcomed</li>
              <li>Training, teamwork & community</li>
              <li>Individual & family membership</li>
            </ul>
            <div className="membership-help">
              <p>Want to try cricket first?</p>
              <a href="#contact">Get in touch with the club →</a>
            </div>
            <p className="aside-note">
              Demo fees: individual 400 kr and family 500 kr per year. The club
              must confirm fees before a real launch.
            </p>
          </aside>
          <div className="membership-panel">
            <div
              className="membership-tabs"
              role="tablist"
              aria-label="Membership options"
              onKeyDown={(event) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
                ) {
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? "apply"
                      : event.key === "End"
                        ? "status"
                        : view === "apply"
                          ? "status"
                          : "apply";
                  setView(next);
                  document.getElementById(`${next}-tab`)?.focus();
                }
              }}
            >
              <button
                type="button"
                role="tab"
                id="apply-tab"
                tabIndex={view === "apply" ? 0 : -1}
                aria-controls="apply-panel"
                aria-selected={view === "apply"}
                onClick={() => {
                  setView("apply");
                  setSubmitted(false);
                }}
              >
                Apply to join
              </button>
              <button
                type="button"
                role="tab"
                id="status-tab"
                tabIndex={view === "status" ? 0 : -1}
                aria-controls="status-panel"
                aria-selected={view === "status"}
                onClick={() => setView("status")}
              >
                Track status
              </button>
            </div>
            <p className="demo-notice">
              Portfolio demo · Use sample details. Applications stay on this
              device; no club registration or payment is made.
            </p>
            {store.error && (
              <p role="alert" className="error-summary">
                {store.error}
              </p>
            )}
            {view === "apply" ? (
              <div role="tabpanel" id="apply-panel" aria-labelledby="apply-tab">
                <ol className="form-steps" aria-label="Application progress">
                  {["Membership", "Your details", "Review"].map((label, i) => (
                    <li
                      key={label}
                      aria-current={step === i + 1 ? "step" : undefined}
                      className={step >= i + 1 ? "step-active" : ""}
                    >
                      <span>{step > i + 1 ? "✓" : i + 1}</span>
                      {label}
                    </li>
                  ))}
                </ol>
                <h3 ref={headingRef} tabIndex={-1} className="form-title">
                  {
                    [
                      "Choose your membership",
                      "Tell us a little about yourself",
                      "Review your application",
                    ][step - 1]
                  }
                </h3>
                {(Object.values(errors).filter(Boolean).length > 0 ||
                  submitError) && (
                  <div role="alert" className="error-summary">
                    <strong>Please check your application.</strong>
                    <ul>
                      {Object.values(errors)
                        .filter(Boolean)
                        .map((error, i) => (
                          <li key={i}>{error}</li>
                        ))}
                      {submitError && <li>{submitError}</li>}
                    </ul>
                  </div>
                )}
                <form noValidate onSubmit={step === 3 ? submitForm : nextStep}>
                  {step === 1 && (
                    <>
                      <fieldset className="plan-options">
                        <legend className="sr-only">Membership type</legend>
                        {plans.map((plan) => (
                          <label
                            className={`plan-card ${form.plan === plan.id ? "plan-selected" : ""}`}
                            key={plan.id}
                          >
                            <input
                              type="radio"
                              name="plan"
                              value={plan.id}
                              checked={form.plan === plan.id}
                              onChange={() => setField("plan", plan.id)}
                            />
                            <span>
                              <strong>{plan.name}</strong>
                              <span className="plan-price">
                                {money(plan.fee)} <small>/ year</small>
                              </span>
                              <span>{plan.description}</span>
                            </span>
                          </label>
                        ))}
                      </fieldset>
                      <p className="field-hint">
                        Illustrative annual fees. No payment is taken in this
                        demo.
                      </p>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <div className="form-subheading">
                        <p>All fields below are required.</p>
                        <button
                          type="button"
                          className="text-button"
                          onClick={fillSample}
                        >
                          Fill sample details
                        </button>
                      </div>
                      <div className="form-grid">
                        <Field
                          id="fullName"
                          label={
                            form.plan === "family"
                              ? "Primary contact’s full name"
                              : "Player’s full name"
                          }
                          error={errors.fullName}
                        >
                          <input
                            {...fieldProps("fullName")}
                            autoComplete="name"
                            maxLength={100}
                          />
                        </Field>
                        <Field
                          id="ageGroup"
                          label="Age group"
                          error={errors.ageGroup}
                        >
                          <select {...fieldProps("ageGroup")}>
                            <option value="adult">18 or older</option>
                            {form.plan !== "family" && (
                              <option value="junior">Under 18</option>
                            )}
                          </select>
                        </Field>
                        <Field
                          id="email"
                          label={
                            form.ageGroup === "junior"
                              ? "Parent / guardian email"
                              : "Contact email"
                          }
                          error={errors.email}
                        >
                          <input
                            {...fieldProps("email")}
                            type="email"
                            autoComplete="email"
                            maxLength={254}
                          />
                        </Field>
                        <Field
                          id="phone"
                          label={
                            form.ageGroup === "junior"
                              ? "Parent / guardian phone"
                              : "Phone number"
                          }
                          error={errors.phone}
                        >
                          <input
                            {...fieldProps("phone")}
                            type="tel"
                            autoComplete="tel"
                            maxLength={30}
                            placeholder="+47 …"
                          />
                        </Field>
                        <Field
                          id="city"
                          label="Town / city"
                          error={errors.city}
                        >
                          <input
                            {...fieldProps("city")}
                            autoComplete="address-level2"
                            maxLength={80}
                          />
                        </Field>
                        <Field
                          id="team"
                          label="Team interest"
                          error={errors.team}
                        >
                          <select {...fieldProps("team")}>
                            {teamOptions.map((team) => (
                              <option key={team}>{team}</option>
                            ))}
                          </select>
                        </Field>
                        <Field
                          id="experience"
                          label="Cricket experience"
                          error={errors.experience}
                        >
                          <select {...fieldProps("experience")}>
                            {experiences.map((value) => (
                              <option key={value}>{value}</option>
                            ))}
                          </select>
                        </Field>
                        {form.ageGroup === "junior" && (
                          <Field
                            id="guardianName"
                            label="Parent / guardian’s full name"
                            error={errors.guardianName}
                          >
                            <input
                              {...fieldProps("guardianName")}
                              maxLength={100}
                              autoComplete="off"
                            />
                          </Field>
                        )}
                      </div>
                      {form.plan === "family" && (
                        <fieldset className="family-members">
                          <legend>Additional family members</legend>
                          <p>
                            The primary contact above is included. Add up to 8
                            additional family members.
                          </p>
                          {form.members.map((member, i) => (
                            <div className="family-member" key={i}>
                              <div className="family-member-heading">
                                <strong>Family member {i + 1}</strong>
                                <button
                                  type="button"
                                  className="text-button"
                                  aria-label={`Remove family member ${i + 1}`}
                                  onClick={() => {
                                    saveDraft({
                                      ...form,
                                      consent: false,
                                      members: form.members.filter(
                                        (_, index) => index !== i,
                                      ),
                                    });
                                    setErrors({});
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                              <div className="form-grid">
                                <Field
                                  id={`member-${i}-name`}
                                  label="Full name"
                                  error={errors[`member-${i}-name`]}
                                >
                                  <input
                                    id={`member-${i}-name`}
                                    value={member.name}
                                    maxLength={100}
                                    required
                                    onChange={(event) =>
                                      setMember(i, "name", event.target.value)
                                    }
                                    aria-invalid={!!errors[`member-${i}-name`]}
                                    aria-describedby={
                                      errors[`member-${i}-name`]
                                        ? `member-${i}-name-error`
                                        : undefined
                                    }
                                  />
                                </Field>
                                <Field
                                  id={`member-${i}-age`}
                                  label="Age group"
                                  error={errors[`member-${i}-age`]}
                                >
                                  <select
                                    id={`member-${i}-age`}
                                    value={member.ageGroup}
                                    onChange={(event) =>
                                      setMember(
                                        i,
                                        "ageGroup",
                                        event.target.value,
                                      )
                                    }
                                  >
                                    <option value="adult">18 or older</option>
                                    <option value="junior">Under 18</option>
                                  </select>
                                </Field>
                                <Field
                                  id={`member-${i}-team`}
                                  label="Team interest"
                                  error={errors[`member-${i}-team`]}
                                >
                                  <select
                                    id={`member-${i}-team`}
                                    value={member.team}
                                    onChange={(event) =>
                                      setMember(i, "team", event.target.value)
                                    }
                                  >
                                    {teamOptions.map((team) => (
                                      <option key={team}>{team}</option>
                                    ))}
                                  </select>
                                </Field>
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="outline-dark-button"
                            disabled={form.members.length >= 8}
                            onClick={() => {
                              saveDraft({
                                ...form,
                                consent: false,
                                members: [...form.members, emptyMember()],
                              });
                              setErrors({});
                            }}
                          >
                            + Add family member
                          </button>
                        </fieldset>
                      )}
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <ApplicationSummary application={form} />
                      <label className="consent-field">
                        <input
                          id="consent"
                          type="checkbox"
                          checked={form.consent}
                          onChange={(event) =>
                            setField("consent", event.target.checked)
                          }
                          aria-invalid={!!errors.consent}
                          aria-describedby={
                            errors.consent ? "consent-error" : undefined
                          }
                        />
                        <span>
                          I agree to save these demo details in this browser and
                          understand that this is not a real club membership.
                        </span>
                      </label>
                      <button
                        type="button"
                        className="text-button"
                        onClick={onPrivacy}
                      >
                        Read demo privacy notice
                      </button>
                      {errors.consent && (
                        <p className="field-error" id="consent-error">
                          {errors.consent}
                        </p>
                      )}
                    </>
                  )}
                  <div className="form-actions">
                    {step > 1 ? (
                      <button
                        type="button"
                        className="outline-dark-button"
                        onClick={() => {
                          setStep(step - 1);
                          setErrors({});
                          setSubmitError("");
                          focusHeading();
                        }}
                      >
                        ← Back
                      </button>
                    ) : (
                      <span />
                    )}
                    <button className="dark-button" type="submit">
                      {step === 3
                        ? "Submit demo application →"
                        : step === 2
                          ? "Review application →"
                          : "Continue →"}
                    </button>
                  </div>
                  <p className="draft-note">
                    {store.error
                      ? "Draft cannot be saved while browser storage is blocked."
                      : "Your draft is saved automatically on this device."}
                  </p>
                </form>
              </div>
            ) : (
              <div
                role="tabpanel"
                id="status-panel"
                aria-labelledby="status-tab"
              >
                <h3 ref={headingRef} tabIndex={-1} className="form-title">
                  {submitted
                    ? "Your demo application is saved."
                    : "Track your application"}
                </h3>
                {submitted && (
                  <p role="status" className="success-message">
                    Thank you! Your application is Pending. Keep the reference
                    below to follow the demo review.
                  </p>
                )}
                <form className="lookup-form" onSubmit={track} noValidate>
                  <div className="form-grid">
                    <Field id="lookup-reference" label="Application reference">
                      <input
                        id="lookup-reference"
                        value={lookup.reference}
                        onChange={(e) =>
                          setLookup({ ...lookup, reference: e.target.value })
                        }
                        placeholder="VCC-…"
                      />
                    </Field>
                    <Field id="lookup-email" label="Contact email">
                      <input
                        id="lookup-email"
                        value={lookup.email}
                        type="email"
                        onChange={(e) =>
                          setLookup({ ...lookup, email: e.target.value })
                        }
                        placeholder="alex@example.test"
                      />
                    </Field>
                  </div>
                  <button className="outline-dark-button" type="submit">
                    Find demo application
                  </button>
                </form>
                {lookupError && (
                  <p className="error-summary" role="alert">
                    {lookupError}
                  </p>
                )}
                {found && (
                  <div className="status-card">
                    <div className="status-card-heading">
                      <div>
                        <small>APPLICATION REFERENCE</small>
                        <h4>{found.id}</h4>
                      </div>
                      <span className={`status-pill status-${found.status}`}>
                        {statusLabel(found.status)}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="text-button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(found.id);
                          setCopied(true);
                          setCopyError("");
                        } catch {
                          setCopied(false);
                          setCopyError(
                            "Copy is unavailable. Select the reference above to copy it manually.",
                          );
                        }
                      }}
                    >
                      {copied ? "Reference copied ✓" : "Copy reference"}
                    </button>
                    {copyError && (
                      <p role="status" className="draft-note">
                        {copyError}
                      </p>
                    )}
                    <p>
                      {found.status === "pending"
                        ? "Waiting for a demo reviewer. You can demonstrate the next step in Demo review."
                        : found.status === "approved"
                          ? "Approved in this demo. This does not create a real membership or confirm payment."
                          : "Declined in this demo. You can edit your details and submit a new demo application."}
                    </p>
                    {found.reviewNote && (
                      <p className="review-note">
                        <strong>Reviewer note:</strong> {found.reviewNote}
                      </p>
                    )}
                    <ApplicationSummary application={found} />
                    <p className="draft-note">
                      Submitted{" "}
                      {new Date(found.createdAt).toLocaleDateString("en-GB")} ·
                      Stored on this device
                    </p>
                    <button
                      type="button"
                      className="dark-button"
                      onClick={onReview}
                    >
                      Open demo review →
                    </button>
                  </div>
                )}
                {!found && !lookupError && (
                  <p className="empty-state">
                    No application to show yet. Submit a demo application, then
                    track it here.
                  </p>
                )}
                <button
                  type="button"
                  className="text-button new-application"
                  onClick={() => {
                    setView("apply");
                    setStep(1);
                    setSubmitted(false);
                    setErrors({});
                    setSubmitError("");
                  }}
                >
                  Start a new application →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
