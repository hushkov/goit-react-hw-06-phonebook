import { useDispatch, useSelector } from 'react-redux';
import ContactListItem from 'Components/ContactList/ContactListItem/ContactListItem';
import s from 'Components/ContactList/ContactList.module.css';
import actions from 'redux/contacts/contacts-actions';
import { getFilteredList } from 'redux/contacts/contacts-selectors';

const ContactList = () => {
  const contacts = useSelector(state => getFilteredList(state));
  const dispatch = useDispatch();

  const onDeleteContact = id => dispatch(actions.deleteContact(id));

  return (
    <ul className={s.contacts}>
      {contacts.map(({ name, number, id }) => (
        <ContactListItem
          name={name}
          number={number}
          id={id}
          onDelete={onDeleteContact}
          key={id}
        />
      ))}
    </ul>
  );
};

export default ContactList;
