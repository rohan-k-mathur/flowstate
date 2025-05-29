'use client';

import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useAppStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import { AppNode } from '@/components/nodes';
import { NodeDetailFromRegistry } from '@/components/nodes/node-details';

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
        {selectedNode && (
          <NodeDetailFromRegistry node={selectedNode} setNodeData={setNodeData} />
        )}
      </DrawerContent>
    </Drawer>
  );
}

