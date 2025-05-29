'use client';

import React from 'react';
import { Background, ReactFlow, ConnectionLineType } from '@xyflow/react';
import { useShallow } from 'zustand/react/shallow';
import { useCallback } from 'react';
import { Play, CheckCircle2, LoaderCircle, XCircle } from 'lucide-react';

import { nodeTypes } from '@/components/nodes';
import { WorkflowEdge } from '@/components/edges/workflow-edge';
import { useAppStore } from '@/store';
import { useLayout } from '@/hooks/use-layout';
import { WorkflowControls } from './controls';
import { useDragAndDrop } from './useDragAndDrop';

const edgeTypes = {
  workflow: WorkflowEdge,
};

const defaultEdgeOptions = { type: 'workflow' };

export default function Workflow() {
  const {
    nodes,
    edges,
    colorMode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeDragStart,
    onNodeDragStop,
  } = useAppStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      colorMode: state.colorMode,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      onNodeDragStart: state.onNodeDragStart,
      onNodeDragStop: state.onNodeDragStop,
    }))
  );

  console.debug('Nodes passed into ReactFlow:', nodes);
  console.debug('Edges passed into ReactFlow:', edges);
  const { onDragOver, onDrop } = useDragAndDrop();
  const runLayout = useLayout(true);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onInit={runLayout}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onNodeDragStart={onNodeDragStart}
      onNodeDragStop={onNodeDragStop}
      colorMode={colorMode}
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <Background />
      <WorkflowControls />
    </ReactFlow>
  );
}
