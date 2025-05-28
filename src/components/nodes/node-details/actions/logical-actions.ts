import { Action } from '../types';

export const logicalActions: Action[] = [
  { id: 'count-items', title: 'Count items' },
  { id: 'fail-workflow', title: 'Fail workflow run' },
  { id: 'for-each-loop', title: 'For each loop (iterate)' },
  { id: 'log-output', title: 'Log output' },
  { id: 'run-code', title: 'Run code' },
  { id: 'send-http-request', title: 'Send HTTP request' },
  { id: 'send-internal-email', title: 'Send internal email' },
  { id: 'sum-items', title: 'Sum items' },
  { id: 'wait', title: 'Wait' },
];
