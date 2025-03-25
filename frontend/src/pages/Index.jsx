import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { tasksApi } from '@/api/taskApi';
import TaskHeader from '@/components/TaskHeader';
import TaskList from '@/components/TaskList';
import CreateTaskForm from '@/components/CreateTaskForm';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Count completed tasks
  const completedCount = tasks.filter(task => task.completed).length;

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
        const fetchedTasks = await tasksApi.getTasks();
        setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await tasksApi.createTask(taskData);
      setTasks(prevTasks => [newTask, ...prevTasks]);
      toast.success('Task created');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleCompleteTask = async (id, completed) => {
    try {
      await tasksApi.updateTask(id, { completed });
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === id ? { ...task, completed } : task
        )
      );
      toast.success(completed ? 'Task completed' : 'Task reopened');
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleUpdateTask = async (id, title, description) => {
    try {
      await tasksApi.updateTask(id, { title, description });
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === id ? { ...task, title, description } : task
        )
      );
      toast.success('Task updated');
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await tasksApi.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      toast.success('Task deleted');
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="task-container">
        <TaskHeader taskCount={tasks.length} completedCount={completedCount} />
        
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
        
        <CreateTaskForm onCreateTask={handleCreateTask} />
      </div>
    </div>
  );
};

export default Index;
