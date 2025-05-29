'use client';

import React, { useContext,useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Panel,
  BackgroundVariant,
  Controls,
  ReactFlowProvider,
  ReactFlowInstance,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type OnNodesChange,  // <-- Explicitly import this
  type OnEdgesChange,  // <-- And this, if needed
} from '@xyflow/react';

import { FlowGraphContext } from '../graph/flow';
import { useNodeTypes } from './nodeTypes';
import { edgeTypes } from './edgeTypes';
import NodeSidebar from './NodeSidebar';
import { Sequencer } from '../nodes/sequencer';

const GraphView = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const nodeTypes = useNodeTypes();

 
  const flowGraph = useContext(FlowGraphContext);
  const { createNode } = useContext(FlowGraphContext);

  const [nodes, setNodes] = useState<Node[]>([]);


  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange:OnNodesChange = useCallback<OnNodesChange>(
    (changes) => {
      setNodes(prevNodes => {
        // Debug: ensure prevNodes is an array
        if (!Array.isArray(prevNodes)) {
          console.error("Nodes state is invalid!", prevNodes);
          return [];  // fallback to empty array to avoid breaking
        }
        return applyNodeChanges(changes, prevNodes);
      });
    },
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback( 
    (changes) => {
      flowGraph.setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [flowGraph.setEdges]
  );
  
  const onInit = useCallback(
    (instance: any) => {
      flowGraph.setReactFlowInstance(instance);
    },
    [flowGraph.setReactFlowInstance]
  );
// GraphView.tsx
const handleAddNode = (type: string) => {
  createNode(type, { x: 150, y: 150 }, {
    label: `${type} Node`,
    cols: 16,
    rows: 2,
    loop: true,
    grid: Array(16).fill(null).map(() => Array(2).fill(false)),
  });
};
  

  return (
    <div>
    <ReactFlowProvider>
    <div style={{ height: '100vh', width: '100%', backgroundColor: '#051014' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={flowGraph.nodes}
          edges={flowGraph.edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView

          nodeTypes={nodeTypes}
          onInit={onInit}
          snapToGrid
          snapGrid={[10, 10]}
          minZoom={0.4}
          maxZoom={2}
          panOnScroll
          panOnScrollSpeed={0.5}
        >
          <Background gap={50} color="#282828"   variant={BackgroundVariant.Lines}
 style={{ backgroundColor: '#051014' }} />
          <Controls />
          <Panel position="top-left">
            <NodeSidebar onAddNode={handleAddNode} />
          </Panel>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
    </div>
  );
};

export default GraphView;