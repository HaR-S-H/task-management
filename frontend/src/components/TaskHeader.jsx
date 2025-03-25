import React from 'react';


const TaskHeader = ({ taskCount, completedCount }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-center mb-1">Elegant Tasks</h1>
      <p className="text-muted-foreground text-center text-sm">
        {taskCount === 0 ? (
          "Start by adding your first task"
        ) : (
          `${completedCount} of ${taskCount} ${taskCount === 1 ? 'task' : 'tasks'} completed`
        )}
      </p>
    </div>
  );
};

export default TaskHeader;