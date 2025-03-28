import { useState } from 'react';
import NewTaskForm from './NewTaskForm';
import Task from './Task';
import Footer from './Footer';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <header className="header">
        <h1>TODOS</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>
      
      <ul className="todo-list">
        {filteredTasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ))}
      </ul>

      <Footer
        activeTasksCount={tasks.filter(t => !t.completed).length}
        filter={filter}
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
      />
    </div>
  );
}