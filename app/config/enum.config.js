module.exports = {
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
    status: { new: "Nouvelle", validated: "Validée", delivred: "Livrée" },
  },
  quote: {
    status: { pending: "En attente", accepted: "Accepté", rejected: "Rejeté" },
  },
};
