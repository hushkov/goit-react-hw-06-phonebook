import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from 'Components/ContactForm/ContactForm.module.css';
import actions from 'redux/contacts/contacts-actions';
import { getContacts } from 'redux/contacts/contacts-selectors';

const INIT_STATE = {
  NAME: '',
  NUMBER: '',
};

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onAddContact = data => dispatch(actions.addContact(data));

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (preventSimilar(name)) {
      alert(`${name} is already in contacts^^`);
    } else {
      onAddContact({ name, number });

      reset();
    }
  };

  const reset = () => {
    setName(INIT_STATE.NAME);
    setNumber(INIT_STATE.NUMBER);
  };

  const preventSimilar = newContactName => {
    const normalizedName = newContactName.toLowerCase();

    return contacts.find(({ name }) => name.toLowerCase().includes(normalizedName));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit} autoComplete="off">
      <h3>Did you already find a new friend?^^</h3>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
          value={number}
          onChange={handleChange}
          required
        />
      </label>
      <button className={s.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
