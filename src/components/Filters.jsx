function Filters({
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  setCurrentPage
}) {
  return (
    <>
      <select
        value={priorityFilter}
        onChange={e => {
          setPriorityFilter(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select
        value={statusFilter}
        onChange={e => {
          setStatusFilter(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="All">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </>
  );
}

export default Filters;
