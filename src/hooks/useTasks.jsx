import { useState, useEffect } from 'react';


export default function useTasks(task) {
    const [task, setTask] = useState();

  
    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => setCount((prev) => prev - 1);
    const reset = () => setCount(initialValue);
  
    return { count, increment, decrement, reset };
  }