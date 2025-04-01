import { useState } from 'react';
import PropTypes from 'prop-types';

export default function NewTaskForm({ onAddTask }) {
  const [newTaskText, setNewTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      onAddTask(newTaskText);
      setNewTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};
