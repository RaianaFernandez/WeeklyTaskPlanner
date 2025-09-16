import { useState, useEffect } from "react";
import Tasks from "./components/Tasks";
import AddTasks from "./components/AddTasks";

// ... outros imports

// Esta função é executada apenas uma vez para inicializar o estado
const getInitialTasks = () => {
  const savedTasks = localStorage.getItem("tasks");

  // Se houver dados salvos, converte de volta para objeto
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  // Se não, retorna um array vazio.
  return [];
};

function App() {
  const [tasks, setTasks] = useState(getInitialTasks);

  // O useEffect é o responsável por salvar os dados
  useEffect(() => {
    // 1. Converte o array de tarefas para uma string JSON
    const tasksJson = JSON.stringify(tasks);

    // 2. Salva a string no localStorage com a chave 'tasks'
    localStorage.setItem("tasks", tasksJson);
  }, [tasks]); // O array de dependências faz o useEffect rodar sempre que 'tasks'

  const [stateFilter, setStateFilter] = useState("all"); //filtro de estado
  const [weekFilter, setWeekFilter] = useState("all"); //filtro de semana
  const [searchTerm, setSearchTerm] = useState(""); // Novo estado para a busca pelo titulo
  const [expandedWeek, setExpandedWeek] = useState(null); // Novo estado para expandir a semana onde uma nova task for adicionada
  const isFilterActive =
    stateFilter !== "all" || weekFilter !== "all" || searchTerm !== "";
  // O useEffect que reage às mudanças nos filtros para que a semana nao fique presa expandida
  useEffect(() => {
    // Se algum dos filtros mudar, reseta o estado de expansão
    setExpandedWeek(null);
  }, [stateFilter, weekFilter, searchTerm]); // As dependências aqui

  function getAllWeeks() {
    // 1. Pega todas as semanas de todas as tarefas
    const allWeeks = tasks.map((task) => task.week);
    // 2. Cria um Set para obter apenas os valores únicos
    const uniqueWeeks = new Set(allWeeks);
    // 3. Converte o Set de volta para um array e o ordena
    return Array.from(uniqueWeeks).sort();
  }
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }
  function deleteTask(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }
  function editTask(taskId, newTitle, newWeek) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        if (task.week !== newWeek && newWeek !== "") {
          return { ...task, week: newWeek };
        }
        if (task.title !== newTitle && newTitle !== "") {
          return { ...task, title: newTitle };
        }
      }
      return task;
    });
    setTasks(newTasks);
  }
  function addTask(title, week) {
    if (title.trim() === "") {
      alert("O título da tarefa não pode estar em branco.");
      return; // Encerra a função se a validação falhar
    }
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1; //se tasks.length for maior que 0, pega o maior id existente, se nao, id=1
    const newTasks = {
      id: newId,
      title,
      week,
      isCompleted: false,
    };
    // Zera todos os filtros (resolvendo o exemplo 1)
    setStateFilter("all");
    setWeekFilter("all");
    setSearchTerm("");
    setExpandedWeek(newTasks.week);
    setTasks([...tasks, newTasks]);
  }
  function filterTasks() {
    return tasks.filter((task) => {
      // 1. Condição para o filtro de status
      const isMatchingStatus =
        stateFilter === "all" ||
        (stateFilter === "true" && task.isCompleted) ||
        (stateFilter === "false" && !task.isCompleted);
      // 2. Condiçao para o filtro de Semana
      const isMatchingWeek = weekFilter === "all" || weekFilter == task.week;

      // 3. Condição para a busca por nome/descrição
      const isMatchingSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // 4. Retorna apenas as tarefas que passam em ambas as condições
      return isMatchingStatus && isMatchingSearch && isMatchingWeek;
    });
  }
  function getGroupedWeeks(weeksToGroup) {
    // O .reduce() tem dois argumentos: uma função e um valor inicial
    return weeksToGroup.reduce((accumulator, task) => {
      const weekNumber = task.week; // O número da semana de cada tarefa

      // Verifica se a semana já existe no objeto acumulador
      if (!accumulator[weekNumber]) {
        // Se não, cria um novo array para essa semana
        accumulator[weekNumber] = [];
      }

      // Adiciona a tarefa ao array da semana correspondente
      accumulator[weekNumber].push(task);

      // Retorna o acumulador para a próxima iteração
      return accumulator;
    }, {}); // O {} é o valor inicial do acumulador (um objeto vazio)
  }
  const filteredTasks = filterTasks();
  const weekGroups = getGroupedWeeks(filteredTasks);
  const availableWeeks = getAllWeeks();

  return (
    <div className="w-screen h-screen  bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-white font-bold text-center">Planner Semanal</h1>
        <AddTasks addTask={addTask} />
        <Tasks
          tasks={weekGroups}
          onTaskClick={onTaskClick}
          deleteTask={deleteTask}
          editTask={editTask}
          setStateFilter={setStateFilter} // Passa a função para o componente filho
          stateFilter={stateFilter} // Passa o estado atual do filtro
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          setWeekFilter={setWeekFilter}
          getAllWeeks={availableWeeks}
          isFilterActive={isFilterActive}
          expandedWeek={expandedWeek}
        />
      </div>
    </div>
  );
}

export default App;
