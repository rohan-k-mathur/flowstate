"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useContext, useRef } from "react";
import { FlowGraphContext, FlowGraphContextType } from "../graph/flow";

const storageKey = "flow-storage-key";

const defaultFlowConfiguration = {
  nodes: [],
  edges: [],
  position: [0, 0],
  zoom: 1,
};


const StorageController = () => {
  const flowGraph = useContext(FlowGraphContext) as FlowGraphContextType;

  const setGraphConfig = useCallback(
    (flowConfig: typeof defaultFlowConfiguration) => {
      flowGraph.setNodes(flowConfig.nodes);
      flowGraph.setEdges(flowConfig.edges);
      flowGraph.reactFlowInstance?.setViewport({
        x: flowConfig.position[0],
        y: flowConfig.position[1] + 100,
        zoom: flowConfig.zoom,
      });
    },
    [flowGraph]
  );
  
  const saveGraph = useCallback(() => {
    if (!flowGraph.reactFlowInstance) return;
    const nodes = flowGraph.nodes;
    const edges = flowGraph.edges;
    const { x, y, zoom } = flowGraph.reactFlowInstance.getViewport();
    const config = { nodes, edges, position: [x, y], zoom };
    localStorage.setItem('flow-storage-key', JSON.stringify(config));
    console.log("Graph saved");
  }, [flowGraph]);

  const loadGraph = useCallback(() => {
    const config = JSON.parse(localStorage.getItem('flow-storage-key') || "null") ?? defaultFlowConfiguration;
    setGraphConfig(config);
    console.log("Loaded config", config);
  }, [setGraphConfig]);

  const resetGraph = useCallback(() => {
    setGraphConfig(defaultFlowConfiguration);
    console.log("Graph reset to default configuration");
  }, [setGraphConfig]);

  useEffect(() => {
    if (flowGraph.reactFlowInstance) {
      loadGraph();
    }
  }, [flowGraph.reactFlowInstance, loadGraph]);

  return (
    <div className="flex space-x-2">
      <Button onClick={saveGraph}>Save</Button>
      <Button onClick={loadGraph}>Load</Button>
      <Button onClick={resetGraph}>Reset</Button>
    </div>
  );
};

export default StorageController;
