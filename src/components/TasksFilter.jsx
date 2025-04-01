import PropTypes from 'prop-types';

export default function TasksFilter({ children, selected, onClick }) {
  let classes = '';
  if (selected) classes += ' selected';
  return (
    <li>
      <button className={classes} onClick={onClick}>
        {children}
      </button>
    </li>
  );
}

TasksFilter.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

TasksFilter.defaultProps = {
  selected: false,
  onClick: () => console.warn('onClick not passed in TasksFilter'),
};
