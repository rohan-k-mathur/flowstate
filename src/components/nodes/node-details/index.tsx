import type { AppNode } from '@/components/nodes';
import { TriggerNodeDetail } from './trigger-node-detail';
import { ActionNodeDetail } from './action-node-detail';
import { BranchNodeDetail } from './branch-node-detail';
import { useShallow } from 'zustand/react/shallow';
import { useAppStore } from '@/store';
import { nodeRegistry } from '@/config/node-registry';
import type { NodeDetailProps } from './types';

type LocalNodeDetailProps = {
  node: AppNode;
};


export function NodeDetail({ node }: { node: AppNode }) {

    const { setNodeData } = useAppStore(
      useShallow((state) => ({ setNodeData: state.setNodeData }))
    );
  
    switch (node.type) {
      case 'trigger-node':
        return <TriggerNodeDetail node={node} setNodeData={setNodeData} />;
      // add cases for other nodes
      default:
        return null;
    }
  }
export const NodeDetailFromRegistry = ({ node, setNodeData }: NodeDetailProps) => {
  const NodeDetailComponent = nodeRegistry[node.type]?.detailComponent;

  if (!NodeDetailComponent) return <div>No detail available</div>;

  return <NodeDetailComponent node={node} setNodeData={setNodeData} />;
};
