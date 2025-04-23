import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useTask } from "../context/TasksContext";

export default function TaskItem({ task, setShowCongrats }) { // ⬅️ Pass setShowCongrats as a prop
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const { removeTask, editTask, moveTask } = useTask();
  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleDelete = (e) => {
    e.stopPropagation();
    removeTask(task.id);
  };

  const handleEditSubmit = () => {
    const trimmed = newTitle.trim();
    if (trimmed && trimmed !== task.title) {
      editTask(task.id, trimmed);
    }
    setIsEditing(false);
  };

  // Status order logic
  const statuses = ['todo', 'inprogress', 'done'];
  const currentIndex = statuses.indexOf(task.status);
  const canMoveLeft = currentIndex > 0;
  const canMoveRight = currentIndex < statuses.length - 1;

  const handleMove = (direction) => {
    const newStatus = statuses[currentIndex + direction];
    moveTask(task.id, newStatus);

    // Trigger congrats message when task moves to "done"
    if (newStatus === 'done') {
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 2000); // Hide after 2 seconds
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="p-2 bg-gray-100 rounded shadow">
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <span className="flex items-center gap-2">
          <span
            {...listeners}
            {...attributes}
            className="cursor-grab text-gray-500"
            title="Drag"
          >
            ≡
          </span>

          {isEditing ? (
            <input
              className="border px-1 py-0.5 rounded"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleEditSubmit}
              onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()}
              autoFocus
            />
          ) : (
            <span onDoubleClick={() => setIsEditing(true)}>{task.title}</span>
          )}
        </span>

        <div className="flex gap-1">
          {/* Left Arrow Button */}
          
     

          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 text-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
          >
            Delete
          </button>
          <button
            onClick={() => handleMove(-1)} // Move left
            disabled={!canMoveLeft}
            className="bg-blue-400 text-white px-2 py-1 rounded disabled:opacity-50 text-sm"
            title="Move left"
          >
            ⬅️
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleMove(1)} // Move right
            disabled={!canMoveRight}
            className="bg-blue-400 text-white px-2 py-1 rounded disabled:opacity-50 text-sm"
            title="Move right"
          >
            ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
