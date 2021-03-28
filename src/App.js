import React, { Component } from 'react';
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

  // addNewContact = submitData => {
  //   const { name, number } = submitData;

  //   const newContact = {
  //     name,
  //     number,
  //     id: nanoid(),
  //   };

  //   if (this.preventSimilar(name)) {
  //     alert(`${name} is already in contacts^^`);
  //   } else {
  //     this.setState(({ contacts }) => ({
  //       contacts: [newContact, ...contacts],
  //     }));
  //     const contacts = loadLocalStorage('contacts');
  //     const localContacts = contacts ? [newContact, ...contacts] : [newContact];
  //     saveLocalStorage('contacts', localContacts);
  //   }
  // };

  // handleFilter = eve => {
  //   this.setState({ filter: eve.currentTarget.value });
  // };

  render() {
    return (
      <div className={s.App}>
        <Section title="Phonebook">
          <ContactForm />
        </Section>
        <Section title="Contacts">
          <Filter />
          <ContactList />
        </Section>
      </div>
    );
  }
}

export default App;
