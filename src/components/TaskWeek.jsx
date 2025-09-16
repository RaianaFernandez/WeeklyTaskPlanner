import TaskItem from "./TaskItem";
import { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
function TaskWeek({
  tasks,
  weekNumber,
  onTaskClick,
  deleteTask,
  editTask,
  isFilterActive,
  expandedWeek,
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    // A única responsabilidade deste useEffect é reagir a um evento de expansão
    if (weekNumber === expandedWeek) {
      setIsDetailsOpen(true);

      return; // Encerra o useEffect aqui
    }

    // Se não houver evento de expansão, reage aos filtros
    if (isFilterActive) {
      setIsDetailsOpen(true);
    } else {
      setIsDetailsOpen(false);
    }
  }, [expandedWeek, weekNumber, isFilterActive]);

  return (
    <ul className="space-y-4 bg-slate-200 rounded-md p-6 shadow">
      <div className="flex gap-2">
        <h1 className="bg-slate-400 font-bold text-white p-2 rounded-md w-full">
          Semana {weekNumber}
        </h1>
        <button
          className="bg-slate-400 text-white p-2 rounded-md"
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        >
          {isDetailsOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </button>
      </div>
      {isDetailsOpen && (
        <div className=" text-slate-500 p-2 rounded-md space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskClick={onTaskClick}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </div>
      )}
    </ul>
  );
}
export default TaskWeek;
