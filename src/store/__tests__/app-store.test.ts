import { describe, it, expect, beforeEach, vi } from 'vitest'

vi.mock('../layout', () => ({
  layoutGraph: vi.fn(async (nodes) => nodes.map(n => ({
    ...n,
    position: { x: 100, y: 100 },
    style: { ...n.style, opacity: 1 }
  })))
}))

vi.mock('@/app/actions/cookies', () => ({
  setColorModeCookie: vi.fn()
}))

import { createAppStore, defaultState } from '../app-store'
import { createNodeByType } from '@/components/nodes'
import { createEdge } from '@/components/edges'
import { layoutGraph } from '../layout'

describe('checkForPotentialConnection', () => {
  it('selects nearest connection site', () => {
    const store = createAppStore({
      ...defaultState,
      connectionSites: new Map([
        ['a', { id: 'a', position: { x: 0, y: 0 }, type: 'target' }]
      ])
    })

    store.getState().checkForPotentialConnection({ x: 10, y: 0 })

    expect(store.getState().potentialConnection?.id).toBe('a')
  })

  it('respects exclude and type options', () => {
    const store = createAppStore({
      ...defaultState,
      connectionSites: new Map([
        ['a', { id: 'a', position: { x: 0, y: 0 }, type: 'target' }],
        ['b', { id: 'b', position: { x: 20, y: 0 }, type: 'source' }]
      ])
    })

    store.getState().checkForPotentialConnection(
      { x: 5, y: 0 },
      { exclude: ['a'], type: 'target' }
    )

    expect(store.getState().potentialConnection?.id).toBe('b')
  })

  it('clears when nothing close', () => {
    const store = createAppStore({
      ...defaultState,
      connectionSites: new Map([
        ['a', { id: 'a', position: { x: 300, y: 300 }, type: 'target' }]
      ])
    })

    store.getState().checkForPotentialConnection({ x: 0, y: 0 })

    expect(store.getState().potentialConnection).toBeUndefined()
  })
})

describe('addNodeInBetween', () => {
  it('creates node and reconnects edges', () => {
    const nodeA = createNodeByType({ type: 'trigger-node', id: 'A', position: { x: 0, y: 0 } })
    const nodeB = createNodeByType({ type: 'output-node', id: 'B', position: { x: 200, y: 0 } })
    const initialEdge = createEdge('A', 'B', 'output', 'input')

    const store = createAppStore({
      ...defaultState,
      nodes: [nodeA, nodeB],
      edges: [initialEdge]
    })

    store.getState().addNodeInBetween({
      type: 'transform-node',
      source: 'A',
      target: 'B',
      sourceHandleId: 'output',
      targetHandleId: 'input',
      position: { x: 100, y: 0 }
    })

    const nodes = store.getState().nodes
    expect(nodes).toHaveLength(3)
    const newNode = nodes.find(n => n.id !== 'A' && n.id !== 'B')!

    const edges = store.getState().edges
    expect(edges).toContainEqual(createEdge('A', newNode.id, 'output', 'input'))
    expect(edges).toContainEqual(createEdge(newNode.id, 'B', 'output', 'input'))
    expect(edges.length).toBe(2)
  })
})

describe('onNodesChange layout logic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls layoutGraph when layout is fixed and dimensions change occurs', async () => {
    const nodeA = createNodeByType({ type: 'trigger-node', id: 'A', position: { x: 0, y: 0 } })
    const store = createAppStore({
      ...defaultState,
      layout: 'fixed',
      nodes: [nodeA],
      edges: []
    })

    await store.getState().onNodesChange([{ id: 'A', type: 'dimensions' }])

    expect(layoutGraph).toHaveBeenCalled()
    expect(store.getState().nodes[0].position).toEqual({ x: 100, y: 100 })
  })
})
