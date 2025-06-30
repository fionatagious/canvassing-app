export const links = {
  home: { name: "Home", href: "/" },
  contacts: { name: "Your contacts", href: "/contacts" },
  newContact: { name: "Add a new contact", href: "/contacts/new" },
  viewContact: { name: "View Contact", href: "/contacts/:id" },
  notes: { name: "Your notes", href: "/notes" },
};

export const filters = {
  contacted: { label: "Contacted", filterName: "contacted" },
  notYetContacted: {
    label: "Not yet contacted",
    filterName: "not_yet_contacted",
  },
  followUpNeeded: {
    label: "Need to follow-up",
    filterName: "follow_up_needed",
  },
};
