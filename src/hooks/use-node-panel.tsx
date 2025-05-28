import { useCallback } from 'react';
import { useAppStore } from '@/store';
import { AppNode } from '@/components/nodes';

export function useNodePanel(node: AppNode) {
  const setSelectedNode = useAppStore((state) => state.setSelectedNode);

  const onClick = useCallback(() => {
    setSelectedNode(node);
  }, [node, setSelectedNode]);

  return { onClick };
}
