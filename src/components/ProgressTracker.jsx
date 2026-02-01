function ProgressTracker({ totalTasks, completedPercentage }) {
  return (
    <div>
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed: {completedPercentage}%</p>
    </div>
  );
}

export default ProgressTracker;
