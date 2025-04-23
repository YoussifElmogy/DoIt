// src/components/TaskBoard.jsx
import { DndContext } from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";
import { useTask } from "../context/TasksContext";
import { useState } from "react";

const columns = ["todo", "inprogress", "done"];

export default function TaskBoard() {
  const { moveTask, tasks } = useTask();
  const [showCongrats, setShowCongrats] = useState(false);

  const handleDragEnd = (event) => {
    console.log(event)
    const { active, over } = event;
    if (!over) return;

    const task = tasks.find((t) => t.id === active.id);

    if (task?.status !== over.id && over.id === "done") {
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 2000);
    }

    moveTask(active.id, over.id);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {columns.map((status) => (
          <TaskColumn
          setShowCongrats={setShowCongrats}
            key={status}
            id={status}
            title={
              status === "todo"
                ? "To Do"
                : status === "inprogress"
                ? "In Progress"
                : "Done"
            }
            tasks={tasks.filter((task) => task.status === status)}
          />
        ))}
      </div>

      {/* 🎉 Popup Message */}
      {showCongrats && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg text-lg font-semibold z-50 animate-bounce">
          🎉LASGOOOOO!!!!
        </div>
      )}
    </DndContext>
  );
}
