import { useState } from "react";
import { useTask } from "../context/TasksContext";

// src/components/AddTaskForm.jsx
export default function AddTaskForm() {
  const [input, setInput] = useState('')
  const {addTask} = useTask();

  const submitHandler=(e)=>{
    e.preventDefault();
    if (input.trim() !== '') {
      addTask(input.trim());
      setInput(''); 
    }
  }

    return (
      <form className="flex gap-2 mt-4" onSubmit={submitHandler}>
        <input
          value={input}
          type="text"
          placeholder="New task..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded"
          onChange={(e)=>setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>
    );
  }
  