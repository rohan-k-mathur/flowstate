import type { AppNode, WorkflowNodeData } from '@/components/nodes';
import { useApps } from '@/hooks/use-apps';
import { useTriggers } from '@/hooks/use-triggers';

export type NodeDetailProps = {
  node: AppNode;
  setNodeData: (nodeId: string, data: Partial<AppNode['data']>) => void;
};

export const TriggerNodeDetail = ({ node, setNodeData }: NodeDetailProps) => {
  const { apps } = useApps();
  const platformKey = node.data.platform;
  const { triggers } = useTriggers(platformKey);

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNodeData(node.id, {
      platform: e.target.value as WorkflowNodeData['platform'],
    });
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNodeData(node.id, {
      event: e.target.value as WorkflowNodeData['event'],
    });
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <label className="font-semibold mb-1 block" htmlFor="platform">
          Choose App
        </label>
        <select
          id="platform"
          className="border rounded p-2 w-full"
          value={platformKey || ''}
          onChange={handlePlatformChange}
        >
          <option value="" disabled>
            Select app
          </option>
          {apps?.map((app: any) => (
            <option key={app.key} value={app.key}>
              {app.name}
            </option>
          ))}
        </select>
      </div>

      {platformKey && (
        <div>
          <label className="font-semibold mb-1 block" htmlFor="trigger-event">
            Choose Trigger Event
          </label>
          <select
            id="trigger-event"
            className="border rounded p-2 w-full"
            value={node.data.event || ''}
            onChange={handleEventChange}
          >
            {(triggers || []).map((trigger: any) => (
              <option key={trigger.key} value={trigger.key}>
                {trigger.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
