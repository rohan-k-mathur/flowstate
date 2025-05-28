'use client';

import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useAppStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import { AppNode } from '@/components/nodes';
//import { TriggerNodeDetail } from '@/components/nodes/node-details/trigger-node-detail';
import { ActionNodeDetail } from '@/components/nodes/node-details/action-node-detail'; // <-- Correct import
import { BranchNodeDetail } from '@/components/nodes/node-details/branch-node-detail';

export function SidePanel() {
  const { selectedNode, clearSelectedNode, setNodeData } = useAppStore(
    useShallow((state) => ({
      selectedNode: state.selectedNode,
      clearSelectedNode: state.clearSelectedNode,
      setNodeData: state.setNodeData,
    }))
  );

  return (
    <Drawer open={!!selectedNode} onClose={clearSelectedNode}>
      <DrawerContent className="ml-auto mr-0 right-0 top-0 h-screen w-[400px] z-50 shadow-lg">
        <DrawerHeader>
          <DrawerTitle>{selectedNode?.data?.title || "Details"}</DrawerTitle>
        </DrawerHeader>
        {selectedNode && <NodeDetail node={selectedNode} setNodeData={setNodeData} />}
      </DrawerContent>
    </Drawer>
  );
}

type NodeDetailProps = {
  node: AppNode;
  setNodeData: (id: string, data: Partial<AppNode['data']>) => void;
};

function NodeDetail({ node, setNodeData }: NodeDetailProps) {
    switch (node.type) {
      case 'trigger-node':
        return <TriggerNodeDetail node={node} setNodeData={setNodeData} />;
      case 'action-node':
        return <ActionNodeDetail node={node} setNodeData={setNodeData} />;
        case 'branch-node':
        return <BranchNodeDetail node={node}  />;
      default:
        return <div className="p-4">No details available for this node.</div>;
    }
  }

const TriggerNodeDetail = ({ node, setNodeData }: NodeDetailProps) => (
  <div className="p-4 flex flex-col gap-2">
    <label htmlFor="platform-select" className="font-semibold">Marketplace Platform:</label>
    <select
      id="platform-select"
      className="border rounded px-3 py-2"
      value={node.data.platform || ''}
      onChange={(e) => setNodeData(node.id, { platform: e.target.value as 'Shopify' | 'Etsy' | 'Amazon' })}
    >
      <option value="Shopify">Shopify</option>
      <option value="Etsy">Etsy</option>
      <option value="Amazon">Amazon</option>
      <option value="eBay">eBay</option>
      <option value="IG Shop">IG Shop</option>
    </select>

    <label htmlFor="trigger-event" className="font-semibold">Trigger Event:</label>
    <select
      id="trigger-event"
      className="border rounded px-3 py-2"
      value={node.data.event || ''}
      onChange={(e) => setNodeData(node.id, { event: e.target.value })}
    >
      <option value="Order placed">Order placed</option>
      <option value="Inventory changed">Inventory changed</option>
      <option value="Checkout abandoned">Checkout abandoned</option>
      <option value="Product created">Product created</option>
      <option value="Review published">Review published</option>
    </select>
  </div>
);

