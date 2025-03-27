import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';

export default function Task({ task, onToggle, onDelete }) {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const updateTime = () => {
            setTimeAgo(formatDistanceToNow(task.createdAt, { 
                addSuffix: true,
                includeSeconds: true
            }));
        };
        
        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        
        return () => clearInterval(intervalId);
    }, [task.createdAt]);

    return (
        <li className={task.completed ? 'completed' : ''}>
            <div className="view">
                <input 
                    className="toggle" 
                    type="checkbox"
                    checked={task.completed}
                    onChange={onToggle}
                />
                <label>
                    <span className="description">{task.text}</span>
                    <span className="created">created {timeAgo}</span>
                </label>
                <button 
                    className="icon icon-destroy"
                    onClick={onDelete}
                />
            </div>
        </li>
    );
}