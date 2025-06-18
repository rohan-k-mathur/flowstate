'use client';
import React, { useState } from 'react';
import { useApps } from '@/hooks/use-apps';
import { useActions } from '@/hooks/use-actions';
import { useActionFields } from '@/hooks/use-action-fields';
import { useConnections } from '@/hooks/use-connections';
import type { NodeDetailProps, Action } from './types';

export const ActionNodeDetail = ({ node, setNodeData }: NodeDetailProps) => {
  const { apps } = useApps();
  const [selectedApp, setSelectedApp] = useState<string | null>(
    node.data.appKey ?? null,
  );
  const [selectedAction, setSelectedAction] = useState<Action | null>(
    node.data.actionType
      ? { id: node.data.actionType, title: node.data.title ?? '' }
      : null,
  );
  const [selectedConnection, setSelectedConnection] = useState<string | null>(
    node.data.connectionId ?? null,
  );
  const { actions } = useActions(selectedApp ?? undefined);
  const { fields } = useActionFields(selectedApp ?? undefined, selectedAction?.id);
  const { connections } = useConnections(selectedApp ?? undefined);

  const handleAppSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const appKey = e.target.value;
    setSelectedApp(appKey);
    setSelectedAction(null);
    setSelectedConnection(null);
    setNodeData(node.id, { appKey, actionType: undefined, connectionId: undefined });
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

  const handleConnectionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const connectionKey = e.target.value;
    setSelectedConnection(connectionKey);
    setNodeData(node.id, {
      appKey: selectedApp ?? undefined,
      connectionId: connectionKey,
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

      {selectedApp && connections && (
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
            {connections.map((connection) => (
              <option key={connection.id} value={connection.id}>
                {connection.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {fields && fields.length > 0 && (
        <div className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1">
              <label className="font-semibold mb-1" htmlFor={field.key}>
                {field.label}
              </label>
              {field.type === 'dropdown' && field.options ? (
                <select
                  id={field.key}
                  className="border rounded p-2 w-full"
                  value={(node.data as any)[field.key] || ''}
                  onChange={(e) =>
                    setNodeData(node.id, { [field.key]: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select {field.label.toLowerCase()}
                  </option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'dynamic' && field.fields ? (
                <div className="flex flex-col gap-2">
                  {(
                    ((node.data as any)[field.key] || []).length > 0
                      ? (node.data as any)[field.key]
                      : [
                          field.fields!.reduce(
                            (acc, cur) => ({ ...acc, [cur.key]: '' }),
                            {},
                          ),
                        ]
                  ).map((entry: Record<string, string>, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        {field.fields!.map((sub) => (
                          <input
                            key={sub.key}
                            id={`${field.key}-${idx}-${sub.key}`}
                            className="border rounded p-2 w-full"
                            value={entry[sub.key] || ''}
                            onChange={(e) => {
                              const arr = [
                                ...((node.data as any)[field.key] || []),
                              ];
                              arr[idx] = {
                                ...arr[idx],
                                [sub.key]: e.target.value,
                              };
                              setNodeData(node.id, { [field.key]: arr });
                            }}
                          />
                        ))}
                        <button
                          type="button"
                          className="text-xs px-2 py-1 border rounded"
                          onClick={() => {
                            const arr = [
                              ...((node.data as any)[field.key] || []),
                            ];
                            arr.splice(idx, 1);
                            setNodeData(node.id, { [field.key]: arr });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ),
                  )}
                  <button
                    type="button"
                    className="text-xs px-2 py-1 border rounded self-start"
                    onClick={() => {
                      const arr = [
                        ...((node.data as any)[field.key] || []),
                        field.fields!.reduce(
                          (acc, cur) => ({ ...acc, [cur.key]: '' }),
                          {},
                        ),
                      ];
                      setNodeData(node.id, { [field.key]: arr });
                    }}
                  >
                    Add {field.label}
                  </button>
                </div>
              ) : (
                <input
                  id={field.key}
                  className="border rounded p-2 w-full"
                  value={(node.data as any)[field.key] || ''}
                  onChange={(e) =>
                    setNodeData(node.id, { [field.key]: e.target.value })
                  }
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
