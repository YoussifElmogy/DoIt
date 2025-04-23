// src/context/TasksContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const TasksContext = createContext();

export const useTask = () => useContext(TasksContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      status: 'todo',
    };
    setTasks(prev => [...prev, newTask]);
  };
  
  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };
  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const editTask = (id, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };
  

  return (
    <TasksContext.Provider value={{ tasks, addTask, setTasks, moveTask, removeTask, editTask  }}>
      {children}
    </TasksContext.Provider>
  );
};
