import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from 'Components/ContactForm/ContactForm.module.css';

import actions from '../../redux/contacts/contacts-actions';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = { name: '', number: '' };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.preventSimilar(this.state.name)) {
      alert(`${this.state.name} is already in contacts^^`);
    } else {
      this.props.onAddContact(this.state);

      this.reset();
    }
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  preventSimilar = newContactName => {
    const { contacts } = this.props;
    const normalizedName = newContactName.toLowerCase();

    return contacts.find(({ name }) => name.toLowerCase().includes(normalizedName));
  };

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit} autoComplete="off">
        <h3>Did you already find a new friend?^^</h3>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            required
          />
        </label>
        <button className={s.button} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

const MapStateToProps = state => ({
  contacts: state.contacts.items,
});

const MapDispatchToProps = dispatch => ({
  onAddContact: data => dispatch(actions.addContact(data)),
});

export default connect(MapStateToProps, MapDispatchToProps)(ContactForm);
