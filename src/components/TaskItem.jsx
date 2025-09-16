import { useState } from "react";
import { GoTrash } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

function TaskItem({ task, onTaskClick, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newWeek, setNewWeek] = useState(task.week);
  const displayView = (
    <li key={task.id} className="flex gap-2 ">
      <button
        className={
          `w-full text-white p-2 rounded-md text-left flex gap-2 ` +
          (task.isCompleted ? `bg-green-600` : `bg-slate-400`)
        }
        onClick={() => onTaskClick(task.id)}
      >
        {task.isCompleted ? <FaCheck /> : ""}
        {task.title}
      </button>
      <button
        className="bg-slate-400 text-white p-2 rounded-md"
        onClick={() => setIsEditing(true)}
      >
        <MdEdit />
      </button>
      <button
        className="bg-slate-400 text-white p-2 rounded-md"
        onClick={() => deleteTask(task.id)}
      >
        <GoTrash />
      </button>
    </li>
  );
  const editView = (
    <li key={task.id} className="flex gap-2 ">
      <input
        type="text"
        className="p-2 w-full bg-white rounded-md"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
      />
      <input
        type="number"
        className="p-2 bg-white rounded-md w-15"
        value={newWeek}
        onChange={(event) => setNewWeek(event.target.value)}
      />
      <button
        className="bg-slate-400 text-white p-2 rounded-md"
        onClick={() => {
          setIsEditing(false);
          editTask(task.id, newTitle, newWeek);
        }}
      >
        <FaCheck />
      </button>
      <button
        className="bg-slate-400 text-white p-2 rounded-md"
        onClick={() => setIsEditing(false)}
      >
        <FaXmark />
      </button>
    </li>
  );
  return isEditing ? editView : displayView;
}
export default TaskItem;

/*
 */
