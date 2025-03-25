import React from 'react';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';
const TaskList = ({ 
  tasks, 
  isLoading, 
  onCompleteTask, 
  onDeleteTask, 
  onUpdateTask 
}) => {
  
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="task-card p-4 animate-pulse-light">
            <div className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-gray-200"></div>
              <div className="ml-3 flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-1">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onComplete={onCompleteTask}
          onDelete={onDeleteTask}
          onUpdate={onUpdateTask}
        />
      ))}
    </div>
  );
};

export default TaskList;