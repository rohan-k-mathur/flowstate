import nodesConfig, { WorkflowNodeProps } from '.';
import WorkflowNode from './workflow-node';
import { AppHandle } from './workflow-node/app-handle';

export function InitialNode({ id, data }: WorkflowNodeProps) {
  return (
    <WorkflowNode id={id} data={data}>
      {nodesConfig['initial-node'].handles.map((handle) => (
        <AppHandle
          key={`${handle.type}-${handle.id}`}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          x={handle.x}
          y={handle.y}
        />
      ))}
      {/* Implement custom node specific functionality here */}
    </WorkflowNode>
  );
}
