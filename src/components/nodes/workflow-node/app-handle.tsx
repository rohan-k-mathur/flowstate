'use client';

import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  Position,
  useConnection,
  useInternalNode,
  useNodeConnections,
  useNodeId,
  XYPosition,
} from '@xyflow/react';

import { type AppStore } from '@/store/app-store';

import { type AppNodeType, NodeConfig } from '@/components/nodes';
import { Button } from '@/components/ui/button';
import { ButtonHandle } from '@/components/button-handle';
import { AppDropdownMenu } from '@/components/app-dropdown-menu';

import { useDropdown } from '@/hooks/use-dropdown';
import { useAppStore } from '@/store';

const compatibleNodeTypes = (type: 'source' | 'target') => {
  if (type === 'source') {
    return (node: NodeConfig) => {
      return (
        node.id === 'transform-node' ||
        node.id === 'join-node' ||
        node.id === 'branch-node' ||
        node.id === 'output-node'
      );
    };
  }
  return (node: NodeConfig) => {
    return (
      node.id === 'transform-node' ||
      node.id === 'join-node' ||
      node.id === 'branch-node' ||
      node.id === 'initial-node'
    );
  };
};

const selector =
  (nodeId: string, type: string, id?: string | null) => (state: AppStore) => ({
    addNodeInBetween: state.addNodeInBetween,
    draggedNodes: state.draggedNodes,
    connectionSites: state.connectionSites,
    isPotentialConnection:
      state.potentialConnection?.id === `handle-${nodeId}-${type}-${id}`,
  });

import { NODE_SIZE } from '@/components/nodes';

const HANDLE_SPACING = 15;

function getYOffset(position: Position, y: number) {
  switch (position) {
    case Position.Bottom:
      // place the indicator below the handle based on its current position
      return y;
    case Position.Top:
      // position indicator above the node with a small gap
      return -NODE_SIZE.height - HANDLE_SPACING;
    default:
      return 0;
  }
}

function getIndicatorPostion(
  nodePosition: XYPosition,
  x: number,
  y: number,
  position: Position
) {
  return {
    x: nodePosition.x + x,
    y: nodePosition.y + y + getYOffset(position, y),
  };
}

const fallbackPosition = { x: 0, y: 0 };

export function AppHandle({
  className,
  position: handlePosition,
  type,
  id,
  x,
  y,
}: {
  className?: string;
  id?: string | null;
  type: 'source' | 'target';
  position: Position;
  x: number;
  y: number;
}) {
  const nodeId = useNodeId() ?? '';

  const connections = useNodeConnections({
    handleType: type,
    handleId: id ?? undefined,
  });

  const isConnectionInProgress = useConnection((c) => c.inProgress);

  const { isOpen, toggleDropdown } = useDropdown();
  const {
    draggedNodes,
    addNodeInBetween,
    connectionSites,
    isPotentialConnection,
  } = useAppStore(useShallow(selector(nodeId, type, id)));

  // We get the actual position of the node
  const nodePosition =
    useInternalNode(nodeId)?.internals.positionAbsolute ?? fallbackPosition;

  const onClick = () => {
    toggleDropdown();
  };

  const onAddNode = useCallback(
    (nodeType: AppNodeType) => {
      if (!nodeId) {
        return;
      }

      addNodeInBetween({
        type: nodeType,
        [type]: nodeId,
        [`${type}HandleId`]: id,
        position: getIndicatorPostion(nodePosition, x, y, handlePosition),
      });

      toggleDropdown();
    },
    [nodeId, id, type, nodePosition, x, y, handlePosition, toggleDropdown, addNodeInBetween]
  );

  const displayAddButton =
    connections.length === 0 &&
    !isConnectionInProgress &&
    !draggedNodes.has(nodeId);

  const connectionId = `handle-${nodeId}-${type}-${id}`;
  useEffect(() => {
    if (displayAddButton) {
      connectionSites.set(connectionId, {
        position: getIndicatorPostion(nodePosition, x, y, handlePosition),
        [type]: {
          node: nodeId,
          handle: id,
        },
        type,
        id: connectionId,
      });
    }
    return () => {
      connectionSites.delete(connectionId);
    };
  }, [
    nodePosition,
    connectionSites,
    connectionId,
    id,
    nodeId,
    type,
    x,
    y,
    handlePosition,
    displayAddButton,
  ]);
  return (
    <ButtonHandle
      type={type}
      position={handlePosition}
      id={id}
      x={x}
      y={y}
      className={clsx(className)}

      showButton={displayAddButton}
    >
      <Button
        onClick={onClick}
        size="icon"
        variant="secondary"
        className={clsx('border h-6 w-6 rounded-xl hover:bg-card', {
          'border-red-500': isPotentialConnection,
        })}
      >
        +
      </Button>
      {isOpen && (
        <div className="absolute z-50 mt-2 left-1/2 transform -translate-x-1/2">
          <AppDropdownMenu
            onAddNode={onAddNode}
            filterNodes={compatibleNodeTypes(type)}
          />
        </div>
      )}
    </ButtonHandle>
  );
}
