'use client';
import React, { useState } from 'react';
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

  const handleAppSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const appKey = e.target.value;
    setSelectedApp(appKey);
    setSelectedAction(null);
    setNodeData(node.id, { appKey, actionType: undefined });
  };

  const handleActionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const actionKey = e.target.value;
    const action = mappedActions.find((a) => a.id === actionKey) || null;
    setSelectedAction(action);
    setNodeData(node.id, {
      appKey: selectedApp ?? undefined,
      actionType: actionKey,
      title: action?.title,
    });
  };

  const mappedActions = (actions || []).map((a: any) => ({
    id: a.key,
    title: a.name,
  }));

  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <label className="font-semibold mb-1 block" htmlFor="action-app">
          Choose App
        </label>
        <select
          id="action-app"
          className="border rounded p-2 w-full"
          value={selectedApp || ''}
          onChange={handleAppSelect}
        >
          <option value="" disabled>
            Select app
          </option>
          {apps?.map((app: any) => (
            <option key={app.key} value={app.key}>
              {app.name}
            </option>
          ))}
        </select>
      </div>

      {selectedApp && (
        <div>
          <label className="font-semibold mb-1 block" htmlFor="action-select">
            Choose Action
          </label>
          <select
            id="action-select"
            className="border rounded p-2 w-full"
            value={selectedAction?.id || ''}
            onChange={handleActionSelect}
          >
            <option value="" disabled>
              Select action
            </option>
            {mappedActions.map((action) => (
              <option key={action.id} value={action.id}>
                {action.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
