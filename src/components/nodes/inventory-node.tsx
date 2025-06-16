"use client"

import { useState, useEffect } from 'react';
import nodesConfig, { WorkflowNodeProps } from '.';
import WorkflowNode from './workflow-node';
import { AppHandle } from './workflow-node/app-handle';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store';


export function InventoryNode({ id, data }: WorkflowNodeProps) {
  const [sku, setSku] = useState(data.sku || '');
  const [quantity, setQuantity] = useState(data.quantity?.toString() || '');

  const setNodeData = useAppStore((state) => state.setNodeData);

  useEffect(() => {
    setSku(data.sku || '');
    setQuantity(data.quantity?.toString() || '');
  }, [data.sku, data.quantity]);

  const handleSkuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSku = e.target.value;
    setSku(newSku);
    setNodeData(id, { sku: newSku });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
  
    const numericQuantity = newQuantity === '' ? 0 : Number(newQuantity);
    setNodeData(id, { quantity: numericQuantity });
  };

  return (
    <WorkflowNode id={id} data={data} type="inventory-node">
      {nodesConfig['inventory-node'].handles.map((handle) => (
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
        <Input
          placeholder="SKU"
          value={sku}
          onChange={handleSkuChange}
        />

<Input
  type="number"
  placeholder="Quantity"
  value={quantity}
  onChange={(e) => {
    e.stopPropagation();
    handleQuantityChange(e);
  }}
  onClick={(e) => e.stopPropagation()}
/>

      </div>
    </WorkflowNode>
  );
}
