import { createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const addContact = createAction('contacts/add', ({ name, number }) => {
  return {
    payload: {
      name,
      number,
      id: nanoid(),
    },
  };
});

const deleteContact = createAction('contacts/delete');

const changeFilter = createAction('contacts/changeFilter');

// eslint-disable-next-line import/no-anonymous-default-export
export default { addContact, deleteContact, changeFilter };
