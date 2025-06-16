"use client";

import nodesConfig, { WorkflowNodeProps } from '.';
import WorkflowNode from './workflow-node';
import { AppHandle } from './workflow-node/app-handle';


export function TriggerNode({ id, data, type }: WorkflowNodeProps) {

  return (
    <WorkflowNode id={id} data={data} type={type}>
      {nodesConfig['trigger-node'].handles.map((handle) => (
        <AppHandle
          key={`${handle.type}-${handle.id}`}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          x={handle.x}
          y={handle.y}
        />
      ))}

      <div className="mt-2 p-2 text-xs bg-white">
        <p>
          Selected App: <strong>{data.platform || 'None'}</strong>
        </p>
        <p className="mt-1">
          Selected Event: <strong>{data.event || 'None'}</strong>
        </p>
      </div>
    </WorkflowNode>
  );
}
