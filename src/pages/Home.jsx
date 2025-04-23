import AddTaskForm from "../components/AddTaskForm";
import TaskBoard from "../components/TaskBoard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🗂️ El kalam 3ala eh</h1>
      
      <AddTaskForm />
      
      <TaskBoard />
    </div>
  );
}
