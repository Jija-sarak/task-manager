import { useState } from "react";

function TaskForm({ tasks, dispatch }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return setError("Title is required");
    if (!priority) return setError("Priority is required");

    const duplicate = tasks.some(
      task => task.title.toLowerCase() === title.toLowerCase()
    );
    if (duplicate) return setError("Task with this title already exists");

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now().toString(),
        title,
        description,
        priority,
        status
      }
    });

    setTitle("");
    setDescription("");
    setPriority("");
    setStatus("Pending");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option value="">Select Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
