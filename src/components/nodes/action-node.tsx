'use client';

import { useState, useEffect, useRef } from 'react';
import nodesConfig, { WorkflowNodeProps, WorkflowNodeData } from '.';
import WorkflowNode from './workflow-node';
import { AppHandle } from './workflow-node/app-handle';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store';
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
  const [listingId, setListingId] = useState(data.listingId || '');
  const [quantity, setQuantity] = useState(data.quantity?.toString() || '');

  const setNodeData = useAppStore((state) => state.setNodeData);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [nodeHeight, setNodeHeight] = useState(50); // initial default height

  useEffect(() => {
    if (nodeRef.current) {
      const { height } = nodeRef.current.getBoundingClientRect();
      setNodeHeight(height);
    }
  }, [data.actionType, data.listingId, data.quantity]);

  useEffect(() => {
    setListingId(data.listingId || '');
    setQuantity(data.quantity || 0);
  }, [data.listingId, data.quantity]);

  const handleListingIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newId = e.target.value;
    setListingId(newId);
    setNodeData(id, { listingId: newId });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    const numericQuantity = newQuantity === '' ? 0 : Number(newQuantity);
    setNodeData(id, { quantity: numericQuantity });
  };
  function calculateBottomYPosition(data: WorkflowNodeData) {
    const baseHeight = 60; // initial node header height
    const fieldHeight = 42; // height per input field or detail line
    const fieldCount = data.actionType ? 3 : 1; // example conditional field count
    return baseHeight + fieldHeight * fieldCount;
  }

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

        <Input
          placeholder="Listing ID"
          value={listingId}
          onChange={handleListingIdChange}
          className="mt-2"
        />

        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => {
            e.stopPropagation();
            handleQuantityChange(e);
          }}
          onClick={(e) => e.stopPropagation()}
          className="mt-2"
        />
      </div>

      {/* <AppHandle
        id="out"
        type="source"
        position="bottom"
        x={NODE_SIZE.width / 2}
        y={calculateBottomYPosition(data)} // dynamically calculate based on content height
      /> */}
    </WorkflowNode>
  );
}
