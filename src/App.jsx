import { useReducer, useState, useEffect } from "react";
import { taskReducer, initialState } from "./reducer/taskReducer";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Pagination from "./components/Pagination";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";
import ProgressTracker from "./components/ProgressTracker";

import "./App.css";

function App() {
  // Initialize state from localStorage
  const [state, dispatch] = useReducer(
    taskReducer,
    initialState,
    () => {
      const storedTasks = localStorage.getItem("tasks");
      return {
        tasks: storedTasks ? JSON.parse(storedTasks) : []
      };
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchText, setSearchText] = useState("");

  const tasksPerPage = 5;

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  // SEARCH
  const searchedTasks = state.tasks.filter(task =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // FILTER
  const filteredTasks = searchedTasks.filter(task => {
    const priorityMatch =
      priorityFilter === "All" || task.priority === priorityFilter;
    const statusMatch =
      statusFilter === "All" || task.status === statusFilter;
    return priorityMatch && statusMatch;
  });

  // PAGINATION
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage) || 1;
  const startIndex = (currentPage - 1) * tasksPerPage;
  const paginatedTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // PROGRESS TRACKER
  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter(
    task => task.status === "Completed"
  ).length;

  const completedPercentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <ProgressTracker
        totalTasks={totalTasks}
        completedPercentage={completedPercentage}
      />

      <TaskForm tasks={state.tasks} dispatch={dispatch} />

      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        setCurrentPage={setCurrentPage}
      />

      <Filters
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setCurrentPage={setCurrentPage}
      />

      <TaskList tasks={paginatedTasks} dispatch={dispatch} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
