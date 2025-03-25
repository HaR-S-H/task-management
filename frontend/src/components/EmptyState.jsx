import React from 'react';
import { ClipboardList } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="task-list-empty animate-fade-in">
      <div className="flex flex-col items-center">
        <ClipboardList className="h-12 w-12 text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks yet</h3>
        <p className="text-muted-foreground text-sm max-w-xs text-center">
          Create your first task by clicking the + button below
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
