import { AppEdge, createEdge } from '@/components/edges';
import { AppNode, createNodeByType, createNodeFromRegistry } from '@/components/nodes';
import { nodeRegistry } from '@/config/node-registry';


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
    data: { title: 'Send Low Inventory Email', actionType: 'send-email' },
  }),
  createNodeFromRegistry({
    type: 'action-node',
    id: 'update-etsy',
    position: { x: 200, y: 200 },
    data: { title: 'Update Etsy Inventory', actionType: 'update-etsy' },
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

export const initialEdges = [
  // createEdge('marketplace-trigger', 'inventory-check', 'output', 'input'),
  // createEdge('inventory-check', 'send-email', 'true', 'input'),
  // createEdge('inventory-check', 'update-etsy', 'false', 'input'),
  // createEdge('send-email', 'wait-node', 'output', 'input'),
  // createEdge('update-etsy', 'wait-node', 'output', 'input'),
  // createEdge('wait-node', 'end-workflow', 'output', 'input'),
];