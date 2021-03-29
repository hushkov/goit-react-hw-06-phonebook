export const getContacts = state => state.contacts.items;

export const getFilterValue = state => state.contacts.filter;

export const getFilteredList = state => {
  const contacts = state.contacts.items;
  const filter = state.contacts.filter;

  const normalizedQuery = filter.toLowerCase();

  return contacts.filter(({ name }) => name.toLowerCase().includes(normalizedQuery));
};
