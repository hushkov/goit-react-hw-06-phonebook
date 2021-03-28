import ContactForm from 'Components/ContactForm/ContactForm';
import ContactList from 'Components/ContactList/ContactList';
import Filter from 'Components/Filter/Filter';
import Section from 'Components/Section/Section';
import s from './App.module.css';

const App = () => {
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
};

export default App;
