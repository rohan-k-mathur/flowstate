'use client';

import { useRef } from 'react';
import { WorkflowNodeProps } from '.';
import WorkflowNode from './workflow-node';
import { AppHandle } from './workflow-node/app-handle';
import { Position } from '@xyflow/react';
import { nodeRegistry } from '@/config/node-registry';
export function ActionNode({ id, data, type }: WorkflowNodeProps) {

  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <WorkflowNode id={id} data={data} type={type} nodeRef={nodeRef}>
      {nodeRegistry['action-node'].handles.map((handle) => (
        <AppHandle
          key={`${handle.type}-${handle.id}`}
          id={handle.id}
          type={handle.type}
          position={handle.position === 'top' ? Position.Top : Position.Bottom}
          x={handle.x}
          y={handle.y}
        />
      ))}

      <div className="mt-2 p-2 text-xs bg-white">
        <p>
          Selected Action: <strong>{data.actionType || 'None'}</strong>
        </p>
        <p className="mt-1">
          Selected App: <strong>{data.appKey || 'None'}</strong>
        </p>
        {data.connectionId && (
          <p className="mt-1">
            Connection: <strong>{data.connectionId}</strong>
          </p>
        )}
      </div>
    </WorkflowNode>
  );
}
