"use client";

import React, { useState } from 'react';
import WorkflowNode from './workflow-node';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store';
import { AppStore } from '@/store/app-store';
import type { AppNodeType, WorkflowNodeData } from './index';

interface AINodeProps {
  id: string;
  data: WorkflowNodeData;
  type: AppNodeType;
}

export default function AINode({ id, data, type }: AINodeProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const nodes = useAppStore((state: AppStore) => state.nodes);
  const edges = useAppStore((state: AppStore) => state.edges);
  const setNodes = useAppStore((state: AppStore) => state.setNodes);
  const setEdges = useAppStore((state: AppStore) => state.setEdges);
  
  
  const handleGenerate = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      //const textResponse = await response.text(); // first get raw text for debug
      //console.debug('Raw Response from Backend:', textResponse);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);

      }
      
      const jsonResponse = await response.json();
      console.debug('Raw Response from Backend:', jsonResponse);

      if (!jsonResponse.nodes || !jsonResponse.edges) {
        console.error("Malformed JSON structure:", jsonResponse);
        return;
      }

      // Format received nodes for the canvas
      const formattedNodes = jsonResponse.nodes.map((node: any) => ({
        ...node,
        position: {
          x: node.position?.x ?? window.innerWidth / 2,
          y: node.position?.y ?? window.innerHeight / 2
        },
        data: node.data || {},
        type: node.type,
      }));

      // Format received edges for the canvas
      const formattedEdges = jsonResponse.edges.map((edge: any) => ({
        ...edge,
        id: edge.id || `${edge.source}-${edge.sourceHandle}-${edge.target}-${edge.targetHandle}`,
        type: 'workflow',
        animated: true,
      }));

      // Update Zustand store
      setNodes([...nodes, ...formattedNodes]);
      setEdges([...edges, ...formattedEdges]);




    //   setNodes(json.nodes);
    //   setEdges(json.edges);
// Debug output for newly created nodes and edges
      console.debug('Nodes after setNodes:', formattedNodes);
      console.debug('Edges after setEdges:', formattedEdges);
    } catch (err) {
      console.error('Failed to generate AI workflow:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <WorkflowNode id={id} data={data} type={type}>
      <div className="p-4 flex flex-col gap-2">
        <Input
          placeholder="Describe your workflow..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={handleGenerate} disabled={loading || !prompt}>
          {loading ? "Generating..." : "Generate Workflow"}
        </Button>
      </div>
    </WorkflowNode>
  );
}