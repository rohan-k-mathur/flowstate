// NodeSidebar.tsx
'use client';

import React from 'react';

interface Props {
  onAddNode: (type: string, position: { x: number; y: number }, data?: any) => void;
}

const NodeSidebar = ({ onAddNode }: Props) => {
  const nodes = [
    { label: 'SuperCollider Node', type: 'supercollider' },
    { label: 'Sequencer Node', type: 'sequencer' },
    { label: 'Sampler Node', type: 'sampler' },
    { label: 'Default Node', type: 'default' },
  ];

  const handleClick = (type: string) => {
    const position = { x: Math.random() * 250, y: Math.random() * 250 };
    const data = { label: type.charAt(0).toUpperCase() + type.slice(1) };
    onAddNode(type, position, data);
  };

  return (
    <div className="bg-white/80 rounded shadow-lg p-2 space-y-2">
      {nodes.map((node) => (
        <button
          key={node.type}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition"
          onClick={() => handleClick(node.type)}
        >
          {node.label}
        </button>
      ))}
    </div>
  );
};

export default NodeSidebar;
