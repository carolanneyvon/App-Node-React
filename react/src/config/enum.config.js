export const ENUM = {
  user: {
    role: { admin: "Administrateur", dealer: "Commercial", boss: "Patron" },
  },
  order: {
    priority: {
      critical: "Très Urgent",
      urgent: "Urgent",
      normal: "Normal",
      low: "Non prioritaire",
    },
  },
  quote: {
    status: { pending: "En attente", accepted: "Accepté", rejected: "Rejeté" },
  },
};
