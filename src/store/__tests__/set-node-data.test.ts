import { describe, it, expect } from 'vitest';
import { createAppStore, defaultState } from '../app-store';
import { createNodeByType } from '@/components/nodes';

describe('setNodeData', () => {
  it('updates node parameters', () => {
    const node = createNodeByType({ type: 'action-node', id: 'A', position: { x: 0, y: 0 } });
    const store = createAppStore({ ...defaultState, nodes: [node], edges: [] });

    store.getState().setNodeData('A', { appKey: 'gmail', actionType: 'sendEmail' });

    const updated = store.getState().nodes.find(n => n.id === 'A');
    expect(updated?.data.appKey).toBe('gmail');
    expect(updated?.data.actionType).toBe('sendEmail');
  });

  it('persists connection id', () => {
    const node = createNodeByType({ type: 'action-node', id: 'B', position: { x: 0, y: 0 } });
    const store = createAppStore({ ...defaultState, nodes: [node], edges: [] });

    store.getState().setNodeData('B', { connectionId: '123' });

    const updated = store.getState().nodes.find(n => n.id === 'B');
    expect(updated?.data.connectionId).toBe('123');
  });

  it('updates selected node', () => {
    const node = createNodeByType({ type: 'action-node', id: 'C', position: { x: 0, y: 0 } });
    const store = createAppStore({ ...defaultState, nodes: [node], edges: [], selectedNode: node });

    store.getState().setNodeData('C', { appKey: 'slack' });

    expect(store.getState().selectedNode?.data.appKey).toBe('slack');
  });
});
