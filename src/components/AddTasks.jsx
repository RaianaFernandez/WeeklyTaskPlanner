import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
function AddTasks({ addTask }) {
  const { translations, language } = useContext(LanguageContext);
  const [title, setTitle] = useState("");
  const [week, setWeek] = useState("");
  return (
    <div className="flex bg-slate-200 rounded-md p-6 shadow gap-2">
      <div className="flex gap-2 w-full">
        <input
          type="text"
          placeholder={translations[language].addTasktitlePlaceholder}
          className="p-2 w-full bg-white rounded-md"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder={translations[language].WordWeek}
          className="p-2 bg-white rounded-md w-20"
          value={week}
          onChange={(event) => setWeek(event.target.value)}
        />
      </div>

      <button
        className="bg-slate-400 text-white p-2 rounded-md"
        onClick={() => addTask(title, week)}
      >
        <IoIosAdd />
      </button>
    </div>
  );
}
export default AddTasks;
