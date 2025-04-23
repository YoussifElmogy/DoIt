// src/components/TaskColumn.jsx
import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";

export default function TaskColumn({ id, title, tasks,setShowCongrats }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="bg-white rounded shadow p-4 min-h-[100px]">
      <h2 className="font-semibold text-xl mb-4">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} setShowCongrats={setShowCongrats} />
        ))}
      </div>
    </div>
  );
}
