import React, { useState } from 'react';
import { Check, Trash, Edit, X, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

const TaskItem = ({ task, onComplete, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
    const handleComplete = () => {
    onComplete(task._id, !task.completed);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(task._id, editTitle, editDescription.trim() || undefined);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task._id);
    }, 300);
  };

  return (
    <div 
      className={cn(
        "task-card p-4 mb-3 animate-fade-in",
        isDeleting && "animate-slide-out opacity-0",
        task.completed && "opacity-80"
      )}
    >
      {isEditing ? (
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="task-input text-base font-medium py-1.5"
            placeholder="Task title"
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="task-input text-sm resize-none min-h-[60px] py-1.5"
            placeholder="Add a description (optional)"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button 
              onClick={handleCancelEdit}
              className="task-action-button flex items-center space-x-1"
            >
              <X size={16} />
              <span className="text-sm">Cancel</span>
            </button>
            <button 
              onClick={handleSaveEdit}
              className="bg-primary text-white rounded-md px-3 py-1.5 text-sm font-medium flex items-center space-x-1 hover:bg-primary/90 transition-colors"
              disabled={!editTitle.trim()}
            >
              <Save size={16} />
              <span>Save</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start">
          <div 
            className={cn("task-checkbox", task.completed && "checked")}
            onClick={handleComplete}
          >
            <Check size={12} className="task-checkbox-check" />
          </div>
          <div className="ml-3 flex-1">
            <h3 className={cn("task-title", task.completed && "completed")}>
              {task.title}
            </h3>
            {task.description && (
              <p className={cn("task-description mt-1", task.completed && "completed")}>
                {task.description}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleStartEdit}
              className="task-action-button"
              aria-label="Edit task"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={handleDelete}
              className="task-action-button text-red-500 hover:text-red-700 hover:bg-red-50"
              aria-label="Delete task"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;