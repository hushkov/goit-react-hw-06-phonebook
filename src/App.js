import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'Components/ContactForm/ContactForm';
import ContactList from 'Components/ContactList/ContactList';
import Filter from 'Components/Filter/Filter';
import Section from 'Components/Section/Section';
import s from './App.module.css';
import { loadLocalStorage, saveLocalStorage } from 'Composables/LocalStorageApi';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storaged = loadLocalStorage('contacts');

    if (storaged) {
      this.setState(({ contacts }) => ({ contacts: [...storaged] }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      saveLocalStorage('contacts', nextContacts);
    }
  }

  addNewContact = submitData => {
    const { name, number } = submitData;

    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    if (this.preventSimilar(name)) {
      alert(`${name} is already in contacts^^`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
      const contacts = loadLocalStorage('contacts');
      const localContacts = contacts ? [newContact, ...contacts] : [newContact];
      saveLocalStorage('contacts', localContacts);
    }
  };

  deleteContact = contactID => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactID),
    }));
  };

  handleFilter = eve => {
    this.setState({ filter: eve.currentTarget.value });
  };

  filteredList = () => {
    const { contacts, filter } = this.state;
    const normalizedQuery = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedQuery),
    );
  };

  preventSimilar = newContactName => {
    const { contacts } = this.state;
    const normalizedName = newContactName.toLowerCase();

    return contacts.find(({ name }) => name.toLowerCase().includes(normalizedName));
  };

  render() {
    const { contacts, filter } = this.state;
    const showFiltered = this.filteredList();

    return (
      <div className={s.App}>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addNewContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.handleFilter} />
          <ContactList
            contacts={filter ? showFiltered : contacts}
            onDelete={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}

export default App;
