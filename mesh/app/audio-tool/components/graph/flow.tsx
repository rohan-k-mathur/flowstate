"use client";
import "@xyflow/react/dist/style.css";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import type { ReactNode } from "react";
import {
  ReactFlow,
  Background,
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
  type OnNodesChange, // <-- Explicitly import this
  type OnEdgesChange, // <-- And this, if needed
} from "@xyflow/react";

export interface FlowGraphContextType {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: (instance: ReactFlowInstance | null) => void;
  createNode: (
    type: string,
    position: { x: number; y: number },
    data?: any
  ) => void;
  deleteNode: (id: string) => void;
  setNodeData: (id: string, data: any) => void;
  getNodeData: (id: string) => any;
  registerBangInput: (nodeId: string, callback: Function) => void;
  getBangOutputHandlers: (nodeId: string, outputCount: number) => Function[];
  nodeTypes: Record<string, React.FC<any>>;
  edgeTypes: Record<string, React.FC<any>>;
}

export const FlowGraphContext = createContext<FlowGraphContextType>({
  nodes: [],
  edges: [],
  setNodes: () => {},
  setEdges: () => {},
  reactFlowInstance: null,
  setReactFlowInstance: () => {},
  createNode: () => {},
  deleteNode: () => {},
  setNodeData: () => {},
  getNodeData: () => undefined,
  registerBangInput: () => {},
  getBangOutputHandlers: () => [],
  nodeTypes: {}, // <-- this was missing
  edgeTypes: {}, // <-- this was missing
});

interface FlowGraphProviderProps {
  children: React.ReactNode;
}

export const FlowGraphProvider: React.FC<FlowGraphProviderProps> = ({
  children,
}) => {
  //const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);


  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const bangInputCallbacks = useRef<Record<string, Function>>({});

  const registerBangInput = useCallback(
    (nodeId: string, callback: Function) => {
      bangInputCallbacks.current[nodeId] = callback;
    },
    []
  );

  const getBangOutputHandlers = useCallback(
    (nodeId: string, outputCount: number) => {
      return Array.from({ length: outputCount }, (_, index) => (time: any) => {
        const edge = edges.find(
          (e) =>
            e.source === nodeId && parseInt(e.sourceHandle || "0") === index
        );
        if (edge && bangInputCallbacks.current[edge.target]) {
          bangInputCallbacks.current[edge.target](time);
        }
      });
    },
    [edges]
  );
  // ✅ Add these properties here, even if empty at first:
  const nodeTypes = {};
  const edgeTypes = {};

  const createNode = useCallback(
    (type: string, position: { x: number; y: number }, data: any = {}) => {
      const id = crypto.randomUUID();
      const newNode = { id, type, position, data };

      console.log("Creating new node:", newNode); // <-- log it clearly

      setNodes((nds = []) => [...nds, newNode]);
    },
    []
  );
  
  

  const deleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
  }, []);

  const setNodeData = useCallback((id: string, data: any) => {
    setNodes(nodes => {
      if (!Array.isArray(nodes)) return [];
      
      return nodes.map(node => {
        if (node.id === id) {
          const mergedData = { ...node.data, ...data };
  
          const hasChanges = Object.entries(mergedData).some(([key, val]) => node.data[key] !== val);
          
          return hasChanges ? { ...node, data: mergedData } : node;
        }
        return node;
      });
    });
  }, []);
  
  
  const getNodeData = useCallback((id: string) => {
    const node = (nodes ?? []).find(node => node.id === id);
    return node?.data;
  }, [nodes]);
  
  

  const onNodesChange: OnNodesChange = useCallback<OnNodesChange>(
    (changes) => {
      setNodes((prevNodes) => {
        // Debug: ensure prevNodes is an array
        if (!Array.isArray(prevNodes)) {
          console.error("Nodes state is invalid!", prevNodes);
          return []; // fallback to empty array to avoid breaking
        }
        return applyNodeChanges(changes, prevNodes);
      });
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  useEffect(() => {
    console.log("Nodes state changed:", nodes);
  }, [nodes]);

  return (
    <FlowGraphContext.Provider
      value={{
        nodes,
        edges,
        setNodes,
        setEdges,
        reactFlowInstance,
        setReactFlowInstance,
        createNode,
        deleteNode,
        setNodeData,
        getNodeData,
        registerBangInput,
        getBangOutputHandlers: getBangOutputHandlers,
        nodeTypes, // or import your node types explicitly
        edgeTypes, // or import your edge types explicitly
      }}
    >
      {children}
    </FlowGraphContext.Provider>
  );
};
