import React from 'react';

interface TodoItemProps {
    task: {
        text: string;
        completed: boolean;
    };
    onToggle: () => void;
    onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <span className="task-text" onClick={onToggle}>
                {task.text}
            </span>
            <button onClick={onDelete}>Delete</button>
        </li>
    );
};

export default TodoItem;
