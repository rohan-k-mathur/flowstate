'use client';
import React, { useState } from 'react';
import { ActionSelector } from '@/components/action-selector';
import { useAppStore } from '@/store';
import { useApps } from '@/hooks/use-apps';
import { useActions } from '@/hooks/use-actions';
import type { NodeDetailProps, Action } from './types';

export const ActionNodeDetail = ({ node }: NodeDetailProps) => {
  const setNodeData = useAppStore((state) => state.setNodeData);
  const { apps } = useApps();
  const [selectedApp, setSelectedApp] = useState<string | null>(
    node.data.appKey ?? null,
  );
  const { actions } = useActions(selectedApp ?? undefined);
  const [selectedAction, setSelectedAction] = useState<Action | null>(
    node.data.actionType
      ? { id: node.data.actionType, title: node.data.title ?? '' }
      : null,
  );

  const handleAppSelect = (appKey: string) => {
    setSelectedApp(appKey);
    setNodeData(node.id, { appKey });
  };

  const handleActionSelect = (action: Action) => {
    setSelectedAction(action);
    setNodeData(node.id, {
      appKey: selectedApp ?? undefined,
      actionType: action.id,
      title: action.title,
    });
  };

  const mappedActions = (actions || []).map((a: any) => ({
    id: a.key,
    title: a.name,
  }));

  return (
    <div className="p-4 space-y-4">
      {!selectedApp ? (
        <>
          {apps?.map((app: any) => (
            <button
              key={app.key}
              className="border p-4 w-full text-left hover:bg-gray-50 rounded"
              onClick={() => handleAppSelect(app.key)}
            >
              {app.name}
            </button>
          ))}
        </>
      ) : (
        <>
          <button
            className="text-sm underline mb-2"
            onClick={() => setSelectedApp(null)}
          >
            ← Back
          </button>
          {selectedAction && (
            <div className="mb-2 text-sm">Current Action: {selectedAction.title}</div>
          )}
          <ActionSelector actions={mappedActions} onSelect={handleActionSelect} />
        </>
      )}
    </div>
  );
};
