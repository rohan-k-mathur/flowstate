import type { AppNode, WorkflowNodeData } from '@/components/nodes';

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
  setNodeData: (nodeId: string, newData: Partial<WorkflowNodeData>) => void;
};

