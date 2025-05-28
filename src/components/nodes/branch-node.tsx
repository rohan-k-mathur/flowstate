import nodesConfig, { WorkflowNodeProps } from '.';
import WorkflowNode from './workflow-node';
import { AppHandle } from './workflow-node/app-handle';

export function BranchNode({ id, data, type }: WorkflowNodeProps) {
  return (
    <WorkflowNode id={id} data={data} type = {type}>
      {nodesConfig['branch-node'].handles.map((handle) => (
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
