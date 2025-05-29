import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ColorMode,
  OnConnect,
  OnEdgesChange,
  OnNodeDrag,
  OnNodesChange,
  XYPosition,
} from '@xyflow/react';
import { WorkflowNodeData } from '@/components/nodes';
import { nodeRegistry } from '@/config/node-registry';


import { setColorModeCookie } from '@/app/actions/cookies';
import nodesConfig, {
  AppNode,
  AppNodeType,
  createNodeByType,
} from '@/components/nodes';
import { AppEdge, createEdge } from '@/components/edges';
import { initialEdges, initialNodes } from '@/data/workflow-data';
import { layoutGraph } from './layout';

export type AppState = {
  nodes: AppNode[];
  edges: AppEdge[];
  colorMode: ColorMode;
  layout: 'fixed' | 'free';
  draggedNodes: Map<string, AppNode>;
  connectionSites: Map<string, PotentialConnection>;
  potentialConnection?: PotentialConnection;
  selectedNode?: AppNode | null;
};

/**
 * You can potentially connect to an already existing edge or to a free handle of a node.
 */
export type PotentialConnection = {
  id: string;
  position: XYPosition;
  type?: 'source' | 'target';
  source?: ConnectionHandle;
  target?: ConnectionHandle;
};
export type ConnectionHandle = {
  node: string;
  handle?: string | null;
};

export type AppActions = {
  setSelectedNode: (node: AppNode | null) => void;
  clearSelectedNode: () => void;
  setNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => void;
  toggleDarkMode: () => void;
  toggleLayout: () => void;
  
  onNodesChange: OnNodesChange<AppNode>;
  setNodes: (nodes: AppNode[]) => void;
  addNode: (node: AppNode) => void;

  removeNode: (nodeId: string) => void;
  addNodeByType: (type: AppNodeType, position: XYPosition) => null | string;
  addNodeInBetween: ({
    type,
    source,
    target,
    sourceHandleId,
    targetHandleId,
    position,
  }: {
    type: AppNodeType;
    source?: string;
    target?: string;
    sourceHandleId?: string | null;
    targetHandleId?: string | null;
    position: XYPosition;
  }) => void;
  getNodes: () => AppNode[];
  setEdges: (edges: AppEdge[]) => void;
  getEdges: () => AppEdge[];
  addEdge: (edge: AppEdge) => void;
  removeEdge: (edgeId: string) => void;
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange<AppEdge>;
  onNodeDragStart: OnNodeDrag<AppNode>;
  onNodeDragStop: OnNodeDrag<AppNode>;
  checkForPotentialConnection: (
    position: XYPosition,
    options?: { exclude?: string[]; type?: 'source' | 'target' }
  ) => void;
  resetPotentialConnection: () => void;


};

export type AppStore = AppState & AppActions;

export const defaultState: AppState = {
  nodes: initialNodes.map((node) => ({ ...node, style: { opacity: 0 } })),
  edges: initialEdges.map((edge) => ({ ...edge, style: { opacity: 0 } })),
  colorMode: 'light',
  layout: 'free',
  draggedNodes: new Map(),
  connectionSites: new Map(),
  potentialConnection: undefined,
  selectedNode: null,
};

export const createAppStore = (initialState: AppState = defaultState) => {
  const store = create<AppStore>()(
    subscribeWithSelector((set, get) => ({
      ...initialState,

      onNodesChange: async (changes) => {
        const nextNodes = applyNodeChanges(changes, get().nodes);
        set({ nodes: nextNodes });

        if (
          get().layout === 'fixed' &&
          changes.some((change) => change.type === 'dimensions')
        ) {
          const layoutedNodes = await layoutGraph(nextNodes, get().edges);
          set({ nodes: layoutedNodes });
        } else {
          set({ nodes: nextNodes });
        }
      },

      setNodes: (nodes) => {
        console.debug('Zustand nodes updated:', nodes);
        set({ nodes });
      },
      
      setEdges: (edges) => {
        console.debug('Zustand edges updated:', edges);
        set({ edges });
      },
      setSelectedNode: (node) => set({ selectedNode: node }),
      clearSelectedNode: () => set({ selectedNode: undefined }),


      setNodeData: (nodeId: string, newData: Partial<WorkflowNodeData>) => {
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === nodeId
              ? { ...node, data: { ...node.data, ...newData } }
              : node
          ),
        }));
      },
      

      

      addNode: (node) => {
        const nextNodes = [...get().nodes, node];
        set({ nodes: nextNodes });
      },

      removeNode: (nodeId) =>
        set({ nodes: get().nodes.filter((node) => node.id !== nodeId) }),

      addNodeByType: (type, position) => {
        const newNode = createNodeByType({ type, position });
       

        if (!newNode) return null;

        get().addNode(newNode);

        return newNode.id;
      },

      getNodes: () => get().nodes,

      addNodeInBetween: ({
        source,
        target,
        type,
        sourceHandleId,
        targetHandleId,
        position,
      }) => {
        const newNodeId = get().addNodeByType(type, position);
        if (!newNodeId) return;

        get().removeEdge(
          `${source}-${sourceHandleId}-${target}-${targetHandleId}`
        );

        const nodeHandles = nodesConfig[type].handles;
        const nodeSource = nodeHandles.find(
          (handle) => handle.type === 'source'
        );
        const nodeTarget = nodeHandles.find(
          (handle) => handle.type === 'target'
        );

        const edges = [];
        if (nodeTarget && source) {
          edges.push(
            createEdge(source, newNodeId, sourceHandleId, nodeTarget.id)
          );
        }

        if (nodeSource && target) {
          edges.push(
            createEdge(newNodeId, target, nodeSource.id, targetHandleId)
          );
        }

        const nextEdges = [...get().edges, ...edges];
        set({ edges: nextEdges });
      },


      getEdges: () => get().edges,

      addEdge: (edge) => {
        const nextEdges = addEdge(edge, get().edges);
        set({ edges: nextEdges });
      },

      removeEdge: (edgeId) => {
        set({ edges: get().edges.filter((edge) => edge.id !== edgeId) });
      },

      onEdgesChange: (changes) => {
        const nextEdges = applyEdgeChanges(changes, get().edges);
        set({ edges: nextEdges });
      },

      onConnect: (connection) => {
        const newEdge: AppEdge = {
          ...connection,
          type: 'workflow',
          id: `${connection.source}-${connection.target}`,
          animated: true,
        };

        get().addEdge(newEdge);
      },

      toggleDarkMode: () =>
        set((state) => ({
          colorMode: state.colorMode === 'dark' ? 'light' : 'dark',
        })),

      toggleLayout: () =>
        set((state) => ({
          layout: state.layout === 'fixed' ? 'free' : 'fixed',
        })),

      checkForPotentialConnection: (position, options) => {
        const closest: {
          distance: number;
          potentialConnection?: PotentialConnection;
        } = {
          distance: Infinity,
          potentialConnection: undefined,
        };

        for (const connectionSite of get().connectionSites.values()) {
          if (options?.exclude?.includes(connectionSite.id)) {
            continue;
          }

          if (
            options?.type &&
            options.type &&
            options.type === connectionSite.type
          ) {
            continue;
          }

          const distance = Math.hypot(
            connectionSite.position.x - position.x,
            connectionSite.position.y - position.y
          );

          if (distance < closest.distance) {
            closest.distance = distance;
            closest.potentialConnection = connectionSite;
          }
        }

        set({
          potentialConnection:
            closest.distance < 150 ? closest.potentialConnection : undefined,
        });
      },

      resetPotentialConnection: () => {
        set({ potentialConnection: undefined });
      },

      onNodeDragStart: (_, __, nodes) => {
        set({ draggedNodes: new Map(nodes.map((node) => [node.id, node])) });
      },
      onNodeDragStop: () => {
        set({ draggedNodes: new Map() });
        set({ potentialConnection: undefined });
      },
     

    }))
  );

  store.subscribe(
    (state) => state.colorMode,
    async (colorMode: ColorMode) => {
      document
        .querySelector('html')
        ?.classList.toggle('dark', colorMode === 'dark');

      await setColorModeCookie(colorMode);
    }
  );

  return store;
};
