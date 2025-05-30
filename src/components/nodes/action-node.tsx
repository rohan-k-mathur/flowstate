'use client';

import { useEffect, useRef } from 'react';
import nodesConfig, { WorkflowNodeProps, WorkflowNodeData } from '.';
import WorkflowNode from './workflow-node';
import { AppHandle } from './workflow-node/app-handle';
import { NODE_SIZE } from '.';
import {
    Position,
    useConnection,
    useInternalNode,
    useNodeConnections,
    useNodeId,
    XYPosition,
  } from '@xyflow/react';
export function ActionNode({ id, data, type }: WorkflowNodeProps) {

  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <WorkflowNode id={id} data={data} type={type} nodeRef={nodeRef}>
      {/* Top Handle */}
      {/* <AppHandle
        id="in"
        type="target"
        position={Position.Top}
        x={NODE_SIZE.width / 2}
        y={0}
      /> */}

      <div className="mt-2 p-2 text-xs bg-white">
        <p>
          Selected Action: <strong>{data.actionType || 'None'}</strong>
        </p>
        <p className="mt-1">
          Selected App: <strong>{data.appKey || 'None'}</strong>
        </p>

      </div>

      {/* <AppHandle
        id="out"
        type="source"
        position="bottom"
        x={NODE_SIZE.width / 2}
        y={50}
      /> */}
    </WorkflowNode>
  );
}
