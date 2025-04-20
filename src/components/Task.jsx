import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import TaskTimer from './TaskTimer';

export default function Task({ task, onToggle, onDelete, onEdit, onTimerUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing) {
      if (editText.trim()) {
        onEdit(task.id, editText.trim());
      }
    } else {
      setEditText(task.text);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className={`${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input 
          className="toggle" 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => onToggle(task.id)} 
        />
        <label>
          <span className="title">{task.text}</span>
          <span className="description">
            <TaskTimer
              initialTime={task.timerSeconds || 0}
              isRunning={task.isTimerRunning || false}
              onTimeUpdate={(seconds, isRunning) => onTimerUpdate(task.id, seconds, isRunning)}
            />
          </span>
          <span className="description">
            created{' '}
            {formatDistanceToNow(task.createdAt, {
              addSuffix: true,
              includeSeconds: true,
            })}
          </span>
        </label>
        <button className="icon icon-edit" onClick={handleEdit} />
        <button className="icon icon-destroy" onClick={() => onDelete(task.id)} />
      </div>
      {isEditing && (
        <input
          className="edit"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
        />
      )}
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    timerSeconds: PropTypes.number,
    isTimerRunning: PropTypes.bool,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onTimerUpdate: PropTypes.func.isRequired,
};