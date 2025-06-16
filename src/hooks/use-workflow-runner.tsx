'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useAppStore } from '@/store';
import { AppNode, WorkflowNodeData } from '@/components/nodes';
import { AppEdge } from '@/components/edges';

export function useWorkflowRunner() {
  const [logMessages, setLogMessages] = useState<string[]>([]);
  useEffect(() => {
    console.debug('Workflow Logs:', logMessages);
  }, [logMessages]);
  const isRunning = useRef(false);

  const { getNodes, getEdges, setNodeData } = useAppStore(
    useShallow((s) => ({
      getNodes: s.getNodes,
      getEdges: s.getEdges,
      setNodeData: s.setNodeData,
    }))
  );

  const stopWorkflow = useCallback(() => {
    isRunning.current = false;
    setLogMessages((prev) => [...prev, 'Workflow stopped.']);
  }, []);

  const resetNodeStatus = useCallback(() => {
    getNodes().forEach((node) => {
      setNodeData(node.id, { status: 'initial' });
    });
  }, [getNodes, setNodeData]);

  const processNode = useCallback(
    async (node: AppNode) => {
      setNodeData(node.id, { status: 'loading' });
  
      try {
        if (node.type === 'trigger-node') {
          const res = await fetch('/api/mock/shopify/orders');
          const result = await res.json();
          if (!result.success) throw new Error('Mock Shopify fetch failed');
  
          setNodeData(node.id, { status: 'success', ordersCount: result.orders.length });
        }
  
        if (node.type === 'action-node') {
          const res = await fetch('/api/mock/etsy/update-inventory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              listing_id: node.data.listingId,
              quantity: node.data.quantity,
            }),
          });
  
          const result = await res.json();
          if (!result.success) throw new Error('Mock Etsy update failed');
  
          setNodeData(node.id, { status: 'success' });
        }
  
      } catch (error: any) {
        setNodeData(node.id, { status: 'error' });
        setLogMessages((prev) => [...prev, `${node.data.title} failed: ${error.message}`]);

      }
  
      setLogMessages((prev) => [...prev, `${node.data.title} processed.`]);
    },
    [setNodeData, setLogMessages]
  );
  

  const executeWorkflowFromNode = async (
    nodeId: string,
    nodesMap: Map<string, AppNode>,
    edgesMap: Map<string, AppEdge[]>
  ) => {
    if (!isRunning.current) return;

    const node = nodesMap.get(nodeId);
    if (!node) return;

    await processNode(node);

    const outgoingEdges = edgesMap.get(nodeId) || [];
    for (const edge of outgoingEdges) {
      await executeWorkflowFromNode(edge.target, nodesMap, edgesMap);
    }
  };

  const runWorkflow = useCallback(
    async (startNodeId?: string) => {
      if (isRunning.current) return;
      isRunning.current = true;

      resetNodeStatus();
      setLogMessages(['Starting workflow...']);

      const nodes = getNodes();
      const edges = getEdges();

      const nodesMap = new Map(nodes.map((node) => [node.id, node]));
      const edgesMap = new Map<string, AppEdge[]>();
      edges.forEach((edge) => {
        if (!edgesMap.has(edge.source)) edgesMap.set(edge.source, []);
        edgesMap.get(edge.source)?.push(edge);
      });

      const initialNodeId =
        startNodeId ||
        nodes.find((node) => !edges.some((e) => e.target === node.id))?.id;

      if (initialNodeId) {
        await executeWorkflowFromNode(initialNodeId, nodesMap, edgesMap);
      }

      if (isRunning.current) {
        setLogMessages((prev) => [...prev, 'Workflow processing complete.']);
      }

      isRunning.current = false;
    },
    [getNodes, getEdges, processNode, resetNodeStatus]
  );

  return {
    logMessages,
    runWorkflow,
    stopWorkflow,
    isRunning: isRunning.current,
  };
}
