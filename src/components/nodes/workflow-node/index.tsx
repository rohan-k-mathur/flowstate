"use client"
import { useCallback,useEffect, useRef, useLayoutEffect, useState } from 'react';
import { Play, CheckCircle2, LoaderCircle, XCircle } from 'lucide-react';
import {
  NodeHeaderTitle,
  NodeHeader,
  NodeHeaderActions,
  NodeHeaderAction,
  NodeHeaderDeleteAction,
  NodeHeaderIcon,
} from '@/components/node-header';
import { NODE_SIZE, WorkflowNodeData } from '@/components/nodes/';
import { useWorkflowRunner } from '@/hooks/use-workflow-runner';
import { iconMapping } from '@/data/icon-mapping';
import { BaseNode } from '@/components/base-node';
import { NodeStatusIndicator } from '@/components/node-status-indicator';
import { useAppStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import { AppNodeType, type AppNode } from '@/components/nodes';
import { Position } from '@xyflow/react';
import type { AppStore } from '@/store/app-store';
import { AppHandle } from './app-handle';
import ResizeObserver from 'resize-observer-polyfill';


function StatusIcon({ status }: { status?: string }) {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="text-green-500" size={16} />;
    case 'loading':
      return <LoaderCircle className="animate-spin text-blue-500" size={16} />;
    case 'error':
      return <XCircle className="text-red-500" size={16} />;
    default:
      return null;
  }
}

type WorkflowNodeProps = {
  id: string;
  type: AppNodeType;
  data: WorkflowNodeData;
  children?: React.ReactNode;
  nodeRef?: React.Ref<HTMLDivElement>;

};

// add selector to get setSelectedNode
const selector = (state: AppStore) => ({
  setSelectedNode: state.setSelectedNode,
});

 
function WorkflowNode({ id, data, type, children, nodeRef }: WorkflowNodeProps) {
  const internalRef = useRef<HTMLDivElement | null>(null); // ✅ Correct
  const [nodeHeight, setNodeHeight] = useState(0);
  const [nodeWidth, setNodeWidth] = useState(260); // default width

  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
  
      if (typeof nodeRef === 'function') {
        nodeRef(node);
      }
      // No assignment needed for object refs; React manages these automatically.
    },
    [nodeRef]
  );
  useEffect(() => {
    if (!internalRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { height, width } = entry.contentRect;
      setNodeHeight(height);
      setNodeWidth(width);
    });

    observer.observe(internalRef.current);
    return () => observer.disconnect();
  }, []);

  const { runWorkflow } = useWorkflowRunner();
  const { setSelectedNode } = useAppStore(
    useShallow((state: AppStore) => ({
      setSelectedNode: state.setSelectedNode,
    }))
  );

  const onSelectNode = useCallback(
    () => setSelectedNode({ id, type, data } as unknown as AppNode),
    [id, type, data, setSelectedNode]
  );

  const handleRunClick = useCallback(() => runWorkflow(id), [id, runWorkflow]);
  const IconComponent = data?.icon ? iconMapping[data.icon] : undefined;

  return (
    <NodeStatusIndicator status={data?.status}>
      <BaseNode
        ref={combinedRef}
        className="p-1"
        onClick={onSelectNode}
      >
        <NodeHeader>
          <NodeHeaderIcon>
            {IconComponent ? <IconComponent aria-label={data?.icon} /> : null}
          </NodeHeaderIcon>
          <NodeHeaderTitle>{data?.title}</NodeHeaderTitle>
          <NodeHeaderActions>
            <NodeHeaderAction onClick={handleRunClick} label="Run node">
              <Play className="stroke-blue-500 fill-blue-500" />
            </NodeHeaderAction>
            <NodeHeaderDeleteAction />
          </NodeHeaderActions>
        </NodeHeader>
        {children}
      </BaseNode>

      <AppHandle
        type="target"
        position={Position.Top}
        x={nodeWidth / 2}
        y={0}
      />
      <AppHandle
        type="source"
        position={Position.Bottom}
        x={nodeWidth / 2}
        y={nodeHeight}
      />

      <div className="absolute bottom-1 right-1">
        <StatusIcon status={data?.status} />
      </div>
    </NodeStatusIndicator>
  );
}


export default WorkflowNode;