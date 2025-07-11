// src/config/node-registry.ts
import React from 'react';
import { LucideIcon, ShoppingCart, UploadCloud, Box, Plug, CheckCircle2, Mail, Clock, Flag, Spline, CheckCheck, Split } from 'lucide-react';
import { TriggerNodeDetail } from '@/components/nodes/node-details/trigger-node-detail';
import { ActionNodeDetail } from '@/components/nodes/node-details/action-node-detail';
import { InventoryNodeDetail } from '@/components/nodes/node-details/inventory-node-detail';
import { BranchNodeDetail } from '@/components/nodes/node-details/branch-node-detail';

export type NodeType =
  | 'trigger-node'
  | 'action-node'
  | 'inventory-node'
  | 'branch-node'
  | 'join-node'
  | 'transform-node'
  | 'output-node'
  | 'ai-node';

export interface NodeRegistryItem {
  id: NodeType;
  category: 'trigger' | 'action' | 'logic';
  title: string;
  icon: string;
  iconComponent: LucideIcon;
  handles: Array<{ id?: string; type: 'source' | 'target'; position: 'top' | 'bottom'; x: number; y: number }>;
  detailComponent?: React.FC<any>;
  dataDefaults?: Record<string, any>;
}

export const nodeRegistry: Record<NodeType, NodeRegistryItem> = {
  'trigger-node': {
    id: 'trigger-node',
    category: 'trigger',
    title: 'Trigger',
    icon: 'Plug',
    iconComponent: Plug,
    handles: [{ type: 'source', position: 'bottom', x: 130, y: 50, id: 'output' }],
    detailComponent: TriggerNodeDetail,
    dataDefaults: { platform: 'Shopify' },
  },
  'action-node': {
    id: 'action-node',
    category: 'action',
    title: 'Action',
    icon: 'UploadCloud',
    iconComponent: UploadCloud,
    handles: [
      { id: 'in', type: 'target', position: 'top', x: 130, y: 0 },
      { id: 'out', type: 'source', position: 'bottom', x: 130, y: 50 },
    ],
    detailComponent: ActionNodeDetail,
    dataDefaults: { actionType: '', title: 'Action', connectionId: '' },
  },
  'inventory-node': {
    id: 'inventory-node',
    category: 'action',
    title: 'Update',
    icon: 'Box',
    iconComponent: Box,
    handles: [
      { type: 'target', position: 'top', x: 130, y: 0, id: 'input' },
      { type: 'source', position: 'bottom', x: 130, y: 50, id: 'output' },
    ],
    detailComponent: InventoryNodeDetail,
    dataDefaults: { quantity: 0, sku: '' },
  },
  'branch-node': {
    id: 'branch-node',
    category: 'logic',
    title: 'Branch',
    icon: 'CheckCircle2',
    iconComponent: CheckCircle2,
    handles: [
      { id: 'input', type: 'target', position: 'top', x: 130, y: 0 }, // <-- explicitly set id="input"
      { id: 'true', type: 'source', position: 'bottom', x: 25, y: 50 },
      { id: 'false', type: 'source', position: 'bottom', x: 235, y: 50 },
    ],
    detailComponent: BranchNodeDetail,
    dataDefaults: {},
  },

  'join-node': {
    id: 'join-node',
    category: 'logic',
    title: 'Join',
    icon: 'Split',
    iconComponent: Split,
    handles: [
      { id: 'true', type: 'target', position: 'top', x: 235, y: 0 },
      { id: 'false', type: 'target', position: 'top', x: 25, y: 0 },
      { type: 'source', position: 'bottom', x: 130, y: 50 },
    ],
    dataDefaults: {},
  },
  
  'transform-node': {
    id: 'transform-node',
    category: 'logic',
    title: 'Transform',
    icon: 'Spline',
    iconComponent: Spline,
    handles: [
      { id: 'input', type: 'target', position: 'top', x: 130, y: 0 },
      { id: 'output', type: 'source', position: 'bottom', x: 130, y: 50 },
    ],
    dataDefaults: {},
  },
  'output-node': {
    id: 'output-node',
    category: 'logic',
    title: 'End',
    icon: 'CheckCheck',
    iconComponent: CheckCheck,
    handles: [{ id: 'input', type: 'target', position: 'top', x: 130, y: 0 }],
    dataDefaults: {},
  },
  'ai-node': {
    id: 'ai-node',
    category: 'logic',
    title: 'AI Workflow Generator',
    icon: 'BrainCircuit',
    iconComponent: Plug, // or appropriate icon
    handles: [{ type: 'source', position: 'bottom', x: 130, y: 80 }],
    dataDefaults: {},
  },
  
};
