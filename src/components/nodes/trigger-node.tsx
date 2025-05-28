"use client";

import { useState, useEffect } from 'react';
import nodesConfig, { WorkflowNodeProps } from '.';
import WorkflowNode from './workflow-node';
import { AppHandle } from './workflow-node/app-handle';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useAppStore } from '@/store';

export function TriggerNode({ id, data, type }: WorkflowNodeProps) {
  const [platform, setPlatform] = useState(data.platform || 'Shopify');

  const setNodeData = useAppStore((state) => state.setNodeData);

  useEffect(() => {
    setPlatform(data.platform || 'Shopify');
  }, [data.platform]);

  const handlePlatformChange = (value: 'Shopify' | 'Etsy') => {
    setPlatform(value);
    setNodeData(id, { platform: value });
  };

  return (
    <WorkflowNode id={id} data={data} type={type}>
      {nodesConfig['trigger-node'].handles.map((handle) => (
        <AppHandle
          key={`${handle.type}-${handle.id}`}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          x={handle.x}
          y={handle.y}
        />
      ))}

      <div className="mt-2 flex flex-col gap-2 text-xs bg-white">
        <Select value={platform} onValueChange={handlePlatformChange}>
          <SelectTrigger>
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Shopify">Shopify</SelectItem>
            <SelectItem value="Etsy">Etsy</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </WorkflowNode>
  );
}
