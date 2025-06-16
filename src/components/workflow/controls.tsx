import { Panel } from '@xyflow/react';
import { Route } from 'lucide-react';

import { ZoomSlider } from '@/components/zoom-slider';
import { Button } from '@/components/ui/button';
import { useLayout } from '@/hooks/use-layout';
import { useWorkflowRunner } from '@/hooks/use-workflow-runner';


export function WorkflowControls() {
  const runLayout = useLayout(true);
  const { runWorkflow, stopWorkflow, isRunning, logMessages } = useWorkflowRunner();


  return (
    <>
      <ZoomSlider position="bottom-left" className="bg-card" />
      <Panel
        position="bottom-right"
        className="bg-card text-foreground rounded-md"
      >
        <Button onClick={runLayout} variant="ghost">
          <Route />
        </Button>
        <div className="p-4">
      <Button onClick={() => runWorkflow()} disabled={isRunning}>
        {isRunning ? 'Running...' : 'Run Workflow'}
      </Button>
      <Button onClick={() => stopWorkflow()} variant="destructive">
        Stop Workflow
      </Button>
      <div className="mt-2 text-sm">
        {logMessages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
    </div>
      </Panel>
    </>
  );
}
