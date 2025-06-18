import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

interface Workflow {
  id: string;
  nodes: any[];
  edges: any[];
}

const workflows: Record<string, Workflow> = {};

app.post('/internal/api/v1/workflows', (req, res) => {
  const workflow: Workflow = { id: Date.now().toString(), ...req.body };
  workflows[workflow.id] = workflow;
  res.json({ success: true, workflow });
});

const apps = [
  { key: 'shopify', name: 'Shopify' },
  { key: 'etsy', name: 'Etsy' },
];

app.get('/internal/api/v1/apps', (_req, res) => {
  res.json({ success: true, apps });
});

app.get('/internal/api/v1/apps/:appKey/actions', (req, res) => {
  res.json({ success: true, actions: [`${req.params.appKey}-action`] });
});

app.get('/internal/api/v1/apps/:appKey/connections', (req, res) => {
  res.json({ success: true, connections: [`${req.params.appKey}-connection`] });
});

app.get('/internal/api/v1/apps/:appKey/triggers', (req, res) => {
  res.json({ success: true, triggers: [`${req.params.appKey}-trigger`] });
});

app.post('/internal/api/v1/workflows/:id/run', (req, res) => {
  const workflow = workflows[req.params.id];
  if (!workflow) return res.status(404).json({ success: false });

  for (const node of workflow.nodes) {
    console.log('Processing node', node.id);
  }

  res.json({ success: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Workflow backend running on port ${port}`);
});
