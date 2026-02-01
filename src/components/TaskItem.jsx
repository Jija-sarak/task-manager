import { useState } from "react";

function TaskItem({ task, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [error, setError] = useState("");

  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: task.id });
  };

  const handleUpdate = () => {
    if (!title.trim()) return setError("Title is required");

    dispatch({
      type: "UPDATE_TASK",
      payload: {
        ...task,
        title,
        description,
        priority,
        status
      }
    });
    setIsEditing(false);
    setError("");
  };

  const priorityColor = {
    Low: "green",
    Medium: "orange",
    High: "red"
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3 style={{ textDecoration: task.status === "Completed" ? "line-through" : "none" }}>{task.title}</h3>
          <p>{task.description}</p>
          <p style={{ color: priorityColor[task.priority] }}>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default TaskItem;
