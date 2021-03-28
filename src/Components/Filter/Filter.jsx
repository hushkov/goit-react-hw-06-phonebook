import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from 'Components/Filter/Filter.module.css';
import actions from '../../redux/contacts/contacts-actions';

const Filter = ({ value, onChangeFilter }) => {
  return (
    <label className={s.label}>
      Find contacts by name
      <input
        className={s.filter}
        type="text"
        value={value}
        onChange={onChangeFilter}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

const mapStateToProp = state => ({
  value: state.contacts.filter,
});

const mapDispatchToProp = dispatch => ({
  onChangeFilter: eve => dispatch(actions.changeFilter(eve.target.value)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Filter);
