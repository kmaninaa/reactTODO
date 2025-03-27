import { useState } from 'react';
import Task from "./Task";
import Footer from "./Footer";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const activeTasksCount = tasks.filter(task => !task.completed).length;

    const addTask = () => {
        if (!newTaskText.trim()) return;
        
        const newTask = {
            id: Date.now(),
            text: newTaskText,
            completed: false,
            createdAt: new Date()
        };

        setTasks([...tasks, newTask]);
        setNewTaskText('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const clearCompleted = () => {
        setTasks(tasks.filter(task => !task.completed));
    };

    return (
        <div className="todo-container">
            <header className="header">
                <h1>todos</h1>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    autoFocus
                />
            </header>
            <ul className="todo-list">
                {filteredTasks.map(task => (
                    <Task 
                        key={task.id}
                        task={task}
                        onToggle={() => toggleTask(task.id)}
                        onDelete={() => deleteTask(task.id)}
                    />
                ))}
            </ul>
            <Footer 
                activeTasksCount={activeTasksCount}
                filter={filter}
                onFilterChange={setFilter}
                onClearCompleted={clearCompleted}
            />
        </div>
    );
}