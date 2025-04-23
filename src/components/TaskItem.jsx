import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useTask } from "../context/TasksContext";

export default function TaskItem({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const { removeTask, editTask } = useTask(); 

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-2 bg-gray-100 rounded shadow"
    >
      <div className="flex justify-between items-center gap-2">
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
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
