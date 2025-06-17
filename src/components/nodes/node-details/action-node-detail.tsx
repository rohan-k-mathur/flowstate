'use client';
import React, { useState } from 'react';
import { useAppStore } from '@/store';
import { useApps } from '@/hooks/use-apps';
import { useActions } from '@/hooks/use-actions';
import { useConnections } from '@/hooks/use-connections';
import type { NodeDetailProps, Action } from './types';

export const ActionNodeDetail = ({ node }: NodeDetailProps) => {
  const setNodeData = useAppStore((state) => state.setNodeData);
  const { apps } = useApps();
  const [selectedApp, setSelectedApp] = useState<string | null>(
    node.data.appKey ?? null,
  );
  const { actions } = useActions(selectedApp ?? undefined);
  const { connections } = useConnections(selectedApp ?? undefined);
  const [selectedAction, setSelectedAction] = useState<Action | null>(
    node.data.actionType
      ? { id: node.data.actionType, title: node.data.title ?? '' }
      : null,
  );
  const [selectedConnection, setSelectedConnection] = useState<string | null>(
    node.data.connectionId ?? null,
  );

  const handleAppSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const appKey = e.target.value;
    setSelectedApp(appKey);
    setSelectedAction(null);
    setSelectedConnection(null);
    setNodeData(node.id, {
      appKey,
      actionType: undefined,
      connectionId: undefined,
    });
  };

  const handleConnectionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const connId = e.target.value;
    setSelectedConnection(connId);
    setNodeData(node.id, {
      appKey: selectedApp ?? undefined,
      connectionId: connId,
    });
  };

  const handleActionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const actionKey = e.target.value;
    const action = mappedActions.find((a) => a.id === actionKey) || null;
    setSelectedAction(action);
    setNodeData(node.id, {
      appKey: selectedApp ?? undefined,
      actionType: actionKey,
      title: action?.title,
      connectionId: selectedConnection ?? undefined,
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
        <>
          <div>
            <label className="font-semibold mb-1 block" htmlFor="connection-select">
              Connection
            </label>
            <select
              id="connection-select"
              className="border rounded p-2 w-full"
              value={selectedConnection || ''}
              onChange={handleConnectionSelect}
            >
              <option value="" disabled>
                Select connection
              </option>
              {(connections || []).map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

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
        </>
      )}
    </div>
  );
};
