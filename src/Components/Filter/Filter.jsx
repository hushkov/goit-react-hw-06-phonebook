import { useDispatch, useSelector } from 'react-redux';
import s from 'Components/Filter/Filter.module.css';
import actions from 'redux/contacts/contacts-actions';
import { getFilterValue } from 'redux/contacts/contacts-selectors';

const Filter = () => {
  const value = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const onChangeFilter = eve => dispatch(actions.changeFilter(eve.target.value));

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

export default Filter;
