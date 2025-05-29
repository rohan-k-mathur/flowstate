'use client';

import { useEffect, useContext } from 'react';
import { FlowGraphContext } from './flow';

export const useTitle = (title: string) => {
  const { setNodeTitle } = useContext(FlowGraphContext);
  useEffect(() => {
    setNodeTitle(title);
  }, [title, setNodeTitle]);
};

export const useData = () => {
  const { nodeData, setNodeData } = useContext(FlowGraphContext);
  return [nodeData, setNodeData];
};

export const useBangInputHandle = (callback: Function, nodeId: string) => {
  const { registerBangInput } = useContext(FlowGraphContext);
  useEffect(() => {
    registerBangInput(nodeId, callback);
  }, [callback, nodeId, registerBangInput]);
};

export const useBangOutputHandles = (nodeId: string, outputs: number) => {
  const { getBangOutputHandlers } = useContext(FlowGraphContext);
  return getBangOutputHandlers(nodeId, outputs);
};
