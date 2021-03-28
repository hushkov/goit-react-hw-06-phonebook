import PropTypes from 'prop-types';
import ContactListItem from 'Components/ContactList/ContactListItem/ContactListItem';
import s from 'Components/ContactList/ContactList.module.css';

import { connect } from 'react-redux';
import actions from '../../redux/contacts/contacts-actions';

const ContactList = ({ contacts, onDeleteContact }) => {
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

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

const filteredList = (contacts, filter) => {
  const normalizedQuery = filter.toLowerCase();

  return contacts.filter(({ name }) => name.toLowerCase().includes(normalizedQuery));
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: filteredList(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(actions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
