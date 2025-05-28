import { AppNode } from '@/components/nodes';

export function BranchNodeDetail({ node }: { node: AppNode }) {
    return (
      <div>
        <h2>Condition Node Settings</h2>
        <p>{node.data.title}</p>
        {/* condition-specific settings here */}
      </div>
    );
  }
  