import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
const CreateTaskForm = ({ onCreateTask }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
    if (!isFormOpen) {
      setTitle('');
      setDescription('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onCreateTask({
        title: title.trim(),
        description: description.trim() || undefined
      });
      setTitle('');
      setDescription('');
      setIsFormOpen(false);
    }
  };

  return (
    <>
      {isFormOpen ? (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center p-4 animate-fade-in">
          <div 
            className="bg-white rounded-lg shadow-lg w-full max-w-md animate-scale-in overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium">Create New Task</h2>
              <button 
                onClick={handleToggleForm}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="task-input py-2 px-3"
                    placeholder="What needs to be done?"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description (optional)
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="task-input py-2 px-3 resize-none min-h-[100px]"
                    placeholder="Add details about this task..."
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={handleToggleForm}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!title.trim()}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button 
          onClick={handleToggleForm}
          className="create-task-button"
          aria-label="Create new task"
        >
          <Plus size={24} />
        </button>
      )}
    </>
  );
};

export default CreateTaskForm;
