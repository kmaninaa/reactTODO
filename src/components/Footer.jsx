import TasksFilter from "./TasksFilter";

export default function Footer({ 
  activeTasksCount, 
  filter, 
  onFilterChange, 
  onClearCompleted 
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {activeTasksCount} {activeTasksCount === 1 ? 'item' : 'items'} left
      </span>
      <ul className="filters">
        <TasksFilter 
          selected={filter === 'all'} 
          onClick={() => onFilterChange('all')}
        >
          All
        </TasksFilter>
        <TasksFilter 
          selected={filter === 'active'}  
          onClick={() => onFilterChange('active')}
        >
          Active
        </TasksFilter>
        <TasksFilter 
          selected={filter === 'completed'} 
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </TasksFilter>
      </ul>
      <button 
        className="clear-completed" 
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
}