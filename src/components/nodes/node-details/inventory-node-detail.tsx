
import { AppNode } from '@/components/nodes';

export function InventoryNodeDetail({ node }: { node: AppNode }) {
    return (
      <div>
        <h2>Inventory Node Settings</h2>
        <p>{node.data.title}</p>
        {/* condition-specific settings here */}
      </div>
    );
  }
  