'use client';
import React, { useState } from 'react';
import { ActionSelector } from '@/components/action-selector'; // ensure correct path
import { shopifyActions } from './actions/shopify-actions';
import { logicalActions } from './actions/logical-actions';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store';
import type { NodeDetailProps, Action } from './types';

export const ActionNodeDetail = ({ node }: NodeDetailProps) => {
    const setNodeData = useAppStore((state) => state.setNodeData);
    const [selectedType, setSelectedType] = useState<string | null>(null);
  
    const handleActionSelect = (action: Action) => {
      setNodeData(node.id, { actionType: action.id, title: action.title });
    };
  
    return (
      <div className="p-4 space-y-4">
        {!selectedType ? (
          <>
            <button
              className="border p-4 w-full text-left hover:bg-gray-50 rounded"
              onClick={() => setSelectedType('Shopify')}
            >
              Shopify Actions
            </button>
            <button
              className="border p-4 w-full text-left hover:bg-gray-50 rounded"
              onClick={() => setSelectedType('Logical')}
            >
              Logical Flow Actions
            </button>
          </>
        ) : (
          <>
            <button
              className="text-sm underline mb-2"
              onClick={() => setSelectedType(null)}
            >
              ← Back
            </button>
            <ActionSelector
              actions={selectedType === 'Shopify' ? shopifyActions : logicalActions}
              onSelect={handleActionSelect}
            />
          </>
        )}
      </div>
    );
  };