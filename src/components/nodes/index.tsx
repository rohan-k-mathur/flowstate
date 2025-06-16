import { Node, NodeProps, Position, XYPosition } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { SquarePlay } from 'lucide-react';

import { iconMapping } from '@/data/icon-mapping';
import type { LucideIcon } from 'lucide-react';

import { OutputNode } from './output-node';
import { InitialNode } from './initial-node';
import { TransformNode } from './transform-node';
import { BranchNode } from './branch-node';
import { JoinNode } from './join-node';
import { TriggerNode } from './trigger-node';
import { InventoryNode } from './inventory-node';
import { ActionNode } from './action-node';
import type { NodeDetailProps } from './node-details/types';
import { nodeRegistry, type NodeType } from '@/config/node-registry';


import { ActionNodeDetail } from './node-details/action-node-detail';
import AINode from './ai-node';
/* WORKFLOW NODE DATA PROPS ------------------------------------------------------ */

export type WorkflowNodeData = {
  title?: string;
  icon?: keyof typeof iconMapping;
  status?: 'loading' | 'success' | 'error' | 'initial';
  sku?: string;
  quantity?: number;
  platform?: 'Shopify' | 'Etsy' | 'Amazon' | 'eBay';
  event?: string;
  selectedTrigger?: string;
  ordersCount?: number;
  listingId?: string;
  actionId?: string;
  actionType?: string;
  /**
   * Key of the application the action belongs to. This is set when an
   * action is chosen in the side panel and displayed within the node.
   */
  appKey?: string;
};

export type WorkflowNodeProps = NodeProps<Node<WorkflowNodeData>> & {
  type: AppNodeType;
  children?: React.ReactNode;
};


export type NodeConfig = {
  id: AppNodeType;
  title: string;
  status?: 'loading' | 'success' | 'error' | 'initial';
  category?: string; // <-- added
  icon: keyof typeof iconMapping;
  iconComponent?: LucideIcon; // <-- added explicitly
  handles: NonNullable<Node['handles']>;
  detailComponent?: React.FC<NodeDetailProps>; // <-- added explicitly
  dataDefaults?: Partial<WorkflowNodeData>; // <-- added explicitly
};

export const NODE_SIZE = { width: 260, height: 50 };

export function createNodeFromRegistry({
  type,
  id,
  position,
  data,
}: {
  type: NodeType; // Now correctly imported from registry
  id?: string;
  position: XYPosition;
  data?: Record<string, any>;
}): AppNode {
  const node = nodeRegistry[type];

  return {
    id: id ?? nanoid(),
    type: node.id,
    position,
    data: {
      ...node.dataDefaults,
      ...data,
      title: node.title,
      icon: node.icon,
    },
  };
}


const nodesConfig: Record<AppNodeType, NodeConfig> = {
  'initial-node': {
    id: 'initial-node',
    title: 'Initial Node',
    status: 'initial',
    handles: [
      {
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
    ],
    icon: 'Rocket',
  },
  'transform-node': {
    id: 'transform-node',
    title: 'Transform',
    handles: [
      {
        id: 'output', // explicitly added handle ID for the source
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
      {
        id: 'input',  // explicitly added handle ID for the target
        type: 'target',
        position: Position.Top,
        x: NODE_SIZE.width * 0.5,
        y: 0,
      },
    ],
    icon: 'Spline',
  },
  
  'join-node': {
    id: 'join-node',
    title: 'Join',
    status: 'initial',
    handles: [
      {
        id: 'true',
        type: 'target',
        position: Position.Top,
        x: NODE_SIZE.width - 25,
        y: 0,
      },
      {
        id: 'false',
        type: 'target',
        position: Position.Top,
        x: 25,
        y: 0,
      },
      {
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
    ],
    icon: 'Split',
  },
  'branch-node': {
    id: 'branch-node',
    title: 'Branch',
    status: 'initial',
    handles: [
      {
        id: 'input', // <-- critical to match your edges
        type: 'target',
        position: Position.Top,
        x: NODE_SIZE.width * 0.5,
        y: 0,
      },
      {
        id: 'true',
        type: 'source',
        position: Position.Bottom,
        x: 25,
        y: NODE_SIZE.height,
      },
      {
        id: 'false',
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width - 25,
        y: NODE_SIZE.height,
      },
    ],
    icon: 'Merge',
  },
  'output-node': {
    id: 'output-node',
    title: 'End',
    handles: [
      {
        id: 'input', // explicitly defined handle ID
        type: 'target',
        position: Position.Top,
        x: NODE_SIZE.width * 0.5,
        y: 0,
      },
    ],
    icon: 'CheckCheck',
  },
  
  'trigger-node': {
    id: 'trigger-node',
    title: 'Trigger',
    status: 'initial',
    handles: [
      {
        id: 'output', // Explicitly added handle ID
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
    ],
    icon: 'ShoppingCart',
  },
  
  'inventory-node': {
    id: 'inventory-node',
    title: 'Update',
    handles: [
      {
        id: 'input',

        type: 'target',
        position: Position.Top,
        x: NODE_SIZE.width * 0.5,
        y: 0,
      },
      {
        type: 'source',
        position: Position.Bottom,
        x: NODE_SIZE.width * 0.5,
        y: NODE_SIZE.height,
      },
    ],
    icon: 'Box',
  },
  'action-node': {
    id: 'action-node',
    category: 'action',
    title: 'Action',
    icon: 'square-play',
    iconComponent: SquarePlay,
    handles: [
      { type: 'target', position: Position.Top, id: 'in', x: 100, y: 0 },
      { type: 'source', position: Position.Bottom, id: 'out', x: 100, y: 40 },
    ],
    detailComponent: ActionNodeDetail,
    dataDefaults: {
      title: 'Action',
      actionType: '',
    },
  },
  'ai-node': {
    id: 'ai-node',
    category: 'logic',
    title: 'AI Workflow Generator',
    icon: 'BrainCircuit',
    iconComponent: SquarePlay, // or appropriate icon
    handles: [{ type: 'source', position: Position.Bottom, x: 130, y: 80 }],
    dataDefaults: {},
  },
};

export const nodeTypes = {
  'initial-node': InitialNode,
  'output-node': OutputNode,
  'transform-node': TransformNode,
  'branch-node': BranchNode,
  'join-node': JoinNode,
  'trigger-node' : TriggerNode,
  'inventory-node' : InventoryNode,
  'action-node' : ActionNode,
  'ai-node' : AINode,
  
};

export function createNodeByType({
  type,
  id,
  position = { x: 0, y: 0 },
  data,
}: {
  type: AppNodeType;
  id?: string;
  position?: XYPosition;
  data?: WorkflowNodeData;
}): AppNode {
  const node = nodesConfig[type];

  const newNode: AppNode = {
    id: id ?? nanoid(),
      data: data ?? {
        title: node.title,
        status: node.status,
        icon: node.icon,
      },
    position: {
      x: position.x - NODE_SIZE.width * 0.5,
      y: position.y - NODE_SIZE.height * 0.5,
    },
    type,
  };

  return newNode;
}

// Now your initial nodes look like:
export const initialNodes: AppNode[] = [
  createNodeFromRegistry({
    type: 'trigger-node',
    id: 'marketplace-trigger',
    position: { x: 0, y: -200 },
    data: { platform: 'Shopify' },
  }),
  createNodeFromRegistry({
    type: 'branch-node',
    id: 'inventory-check',
    position: { x: 0, y: 0 },
    data: { title: 'Inventory < 20?' },
  }),
  createNodeFromRegistry({
    type: 'action-node',
    id: 'send-email',
    position: { x: -200, y: 200 },
    data: { title: 'Send Low Inventory Email' },
  }),
  createNodeFromRegistry({
    type: 'action-node',
    id: 'update-etsy',
    position: { x: 200, y: 200 },
    data: { title: 'Update Etsy Inventory' },
  }),
  createNodeFromRegistry({
    type: 'transform-node',
    id: 'wait-node',
    position: { x: 0, y: 400 },
    data: { title: 'Wait 1 Day' },
  }),
  createNodeFromRegistry({
    type: 'output-node',
    id: 'end-workflow',
    position: { x: 0, y: 600 },
    data: { title: 'End Workflow' },
  }),
];

export type AppNode =
  | Node<WorkflowNodeData, 'initial-node'>
  | Node<WorkflowNodeData, 'transform-node'>
  | Node<WorkflowNodeData, 'join-node'>
  | Node<WorkflowNodeData, 'branch-node'>
  | Node<WorkflowNodeData, 'output-node'>
  | Node<WorkflowNodeData, 'trigger-node'>
  | Node<WorkflowNodeData, 'inventory-node'>
  | Node<WorkflowNodeData, 'action-node'>
  | Node<WorkflowNodeData, 'ai-node'>;


export type AppNodeType = NonNullable<AppNode['type']>;

export default nodesConfig;
