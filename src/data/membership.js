export const plans = [
  {
    id: "individual",
    name: "Individual",
    fee: 400,
    description: "One player. All experience levels welcome.",
  },
  {
    id: "family",
    name: "Family",
    fee: 500,
    description: "Enjoy the game together, adults and children.",
  },
];
export const teamOptions = [
  "Men's Team",
  "Women's Team",
  "Junior Cricket",
  "Social Cricket",
];
export const experiences = [
  "New to cricket",
  "Recreational player",
  "Experienced player",
];
export const emptyMember = () => ({
  name: "",
  ageGroup: "adult",
  team: "Social Cricket",
});
export const emptyApplication = () => ({
  plan: "individual",
  fullName: "",
  email: "",
  phone: "",
  city: "",
  ageGroup: "adult",
  team: "Social Cricket",
  experience: "New to cricket",
  guardianName: "",
  members: [emptyMember()],
  consent: false,
});

export function normalizeApplication(value) {
  const text = (v) => (typeof v === "string" ? v.trim() : "");
  return {
    plan: text(value.plan),
    fullName: text(value.fullName),
    email: text(value.email).toLowerCase(),
    phone: text(value.phone),
    city: text(value.city),
    ageGroup: text(value.ageGroup),
    team: text(value.team),
    experience: text(value.experience),
    guardianName: text(value.guardianName),
    consent: value.consent === true,
    members:
      value.plan === "family" && Array.isArray(value.members)
        ? value.members
            .filter((m) => m && typeof m === "object")
            .map((m) => ({
              name: text(m.name),
              ageGroup: text(m.ageGroup),
              team: text(m.team),
            }))
        : [],
  };
}

export function validateApplication(value, { requireConsent = true } = {}) {
  const data = normalizeApplication(value);
  const errors = {};
  if (!plans.some((p) => p.id === data.plan))
    errors.plan = "Choose a membership type.";
  if (data.fullName.length < 2 || data.fullName.length > 100)
    errors.fullName = "Enter a name between 2 and 100 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254)
    errors.email = "Enter a valid email address.";
  const digits = data.phone.replace(/\D/g, "");
  if (
    !/^[+\d\s().-]+$/.test(data.phone) ||
    digits.length < 8 ||
    digits.length > 15
  )
    errors.phone =
      "Enter a phone number with 8–15 digits, including country code if needed.";
  if (data.city.length < 2 || data.city.length > 80)
    errors.city = "Enter your town or city (2–80 characters).";
  if (!["adult", "junior"].includes(data.ageGroup))
    errors.ageGroup = "Choose an age group.";
  if (!teamOptions.includes(data.team)) errors.team = "Choose a team interest.";
  if (!experiences.includes(data.experience))
    errors.experience = "Choose your cricket experience.";
  if (
    data.ageGroup === "junior" &&
    data.plan === "individual" &&
    (data.guardianName.length < 2 || data.guardianName.length > 100)
  )
    errors.guardianName =
      "A parent or guardian name is required for a player under 18.";
  if (data.ageGroup === "junior" && data.plan === "family")
    errors.ageGroup =
      "The primary contact for a family membership must be 18 or older.";
  if (data.plan === "family") {
    if (!data.members.length || data.members.length > 8)
      errors.members = "Add 1–8 additional family members.";
    data.members.forEach((m, i) => {
      if (m.name.length < 2 || m.name.length > 100)
        errors[`member-${i}-name`] =
          "Enter this family member’s name (2–100 characters).";
      if (!["adult", "junior"].includes(m.ageGroup))
        errors[`member-${i}-age`] = "Choose an age group.";
      if (!teamOptions.includes(m.team))
        errors[`member-${i}-team`] = "Choose a team interest.";
    });
  }
  if (requireConsent && !data.consent)
    errors.consent = "Agree to the demo privacy notice before submitting.";
  return errors;
}
