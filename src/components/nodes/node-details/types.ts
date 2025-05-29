import { AppNode } from '@/components/nodes';

export type ActionType = 'shopify' | 'logical';

export interface Action {
  id: string;
  title: string;
  description?: string;
}

export interface ActionCategory {
  type: ActionType;
  actions: Action[];
}

export type NodeDetailProps = {
    node: AppNode;
    setNodeData: (nodeId: string, newData: Partial<any>) => void;
  };

// src/components/nodes/types.ts
export type WorkflowNodeData = {
    title: string;
    platform?: string;
    event?: string;
    actionType?: string;  // <-- add this if not already present
    listingId?: string;
    quantity?: number;
    /**
     * Key of the application selected for this action node.
     */
    appKey?: string;
  };
  
