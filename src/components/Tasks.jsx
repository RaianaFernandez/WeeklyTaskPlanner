import TaskWeek from "./TaskWeek";

function Tasks({
  tasks,
  onTaskClick,
  deleteTask,
  editTask,
  setStateFilter,
  stateFilter,
  setSearchTerm,
  searchTerm,
  weekFilter,
  setWeekFilter,
  getAllWeeks,
  isFilterActive,
  expandedWeek,
}) {
  return (
    <div className="space-y-4">
      <ul className="space-y-4 bg-slate-200 rounded-md p-6 shadow">
        <div className="border border-slate-500 p-2 rounded-md flex gap-2 items-center">
          <label className="text-slate-500">Filtrar:</label>
          <select
            className="bg-white rounded-md p-1 text-slate-500 "
            value={stateFilter} // O valor do select é controlado pelo estado do pai
            onChange={(event) => setStateFilter(event.target.value)} // Chama a função do pai
          >
            <option value="all">Todas</option>
            <option value="false">Ativas</option>
            <option value="true">Completas</option>
          </select>
          <select
            className="bg-white rounded-md p-1 text-slate-500 "
            value={weekFilter} // O valor do select é controlado pelo estado do pai
            onChange={(event) => setWeekFilter(event.target.value)} // Chama a função do pai
          >
            <option value="all">Todas</option>
            {getAllWeeks.map((weekId) => (
              <option key={weekId} value={weekId}>
                Semana {weekId}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Buscar tarefa"
            value={searchTerm}
            className="bg-white text-slate-500 p-1 w-full rounded-md"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </ul>
      {Object.keys(tasks).map((weekId) => (
        <TaskWeek
          key={weekId}
          tasks={tasks[weekId]}
          weekNumber={weekId}
          onTaskClick={onTaskClick}
          deleteTask={deleteTask}
          editTask={editTask}
          isFilterActive={isFilterActive}
          expandedWeek={expandedWeek}
        />
      ))}
    </div>
  );
}
export default Tasks;
