'use client';
import React from 'react';
import { Action } from './nodes/node-details/types';
import { useState } from 'react';
import { Input } from '@/components/ui/input';



interface ActionSelectorProps {
    actions: Action[]; // <-- use Action[] instead of string[]
    onSelect: (action: Action) => void;
  }
  
  
export const ActionSelector = ({ actions, onSelect }: ActionSelectorProps) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredActions = actions.filter((action) =>
      action.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Search actions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  
        <div className="h-[400px] overflow-auto border rounded-md p-2 space-y-1">
          {filteredActions.map((action) => (
            <button
              key={action.id}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition"
              onClick={() => onSelect(action)}
            >
              {action.title}
            </button>
          ))}
        </div>
      </div>
    );
  };
