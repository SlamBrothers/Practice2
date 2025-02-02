import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';

interface Task {
    text: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks);
                if (Array.isArray(parsedTasks)) {
                    console.log('Loaded tasks:', parsedTasks);
                    setTasks(parsedTasks);
                } else {
                    console.error('Invalid tasks format:', parsedTasks);
                }
            } catch (error) {
                console.error('Error parsing tasks:', error);
            }
        }
    }, []);


    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            setTasks([...tasks, { text: input, completed: false }]);
            setInput('');
        }
    };

    const toggleTask = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const deleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div>
            <h1>Simple To Do List</h1>
            <form onSubmit={handleSubmit} id="todo-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a task..."
                    required
                    id="todo-input"
                />
                <button type="submit">Add</button>
            </form>
            <ul id="todo-list">
                {tasks.map((task, index) => (
                    <TodoItem
                        key={index}
                        task={task}
                        onToggle={() => toggleTask(index)}
                        onDelete={() => deleteTask(index)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default App;
