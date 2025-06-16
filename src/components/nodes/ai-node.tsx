"use client";

import React, { useState } from 'react';
import WorkflowNode from './workflow-node';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store';
import { shallow } from 'zustand/shallow';
import { AppStore } from '@/store/app-store';

interface AINodeProps {
    id: string;
    data: any;
    type: string;
  }

  export default function AINode({ id, data, type }: AINodeProps) {
    const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  // Explicitly typed Zustand selector to resolve "unknown" errors
  const nodes = useAppStore((state: AppStore) => state.nodes, shallow);
  const edges = useAppStore((state: AppStore) => state.edges, shallow);
  const setNodes = useAppStore((state: AppStore) => state.setNodes);
  const setEdges = useAppStore((state: AppStore) => state.setEdges);
  const setNodeData = useAppStore((state) => state.setNodeData);
  
  
  const handleGenerate = async () => {
    setLoading(true);
    setNodeData(id, { status: 'loading' });

    try {
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      //const textResponse = await response.text(); // first get raw text for debug
      //console.debug('Raw Response from Backend:', textResponse);

      if (!response.ok) {
        const errResp = await response.json().catch(() => ({}));
        const message = errResp?.error?.message || `API error: ${response.status}`;
        throw new Error(message);
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
      setNodeData(id, { status: 'success' });
    } catch (err: any) {
      console.error('Failed to generate AI workflow:', err);
      setNodeData(id, { status: 'error', errorMessage: err.message });
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
