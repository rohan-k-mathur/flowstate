"use client";
import Space from "antd";
import {  Checkbox } from "../gui/Checkbox";
import { useCallback, useEffect, useState, useContext } from "react";
import _ from "lodash";
import { NumberInputer } from "../gui/gui";
import { b, useOnGlobalSchedulerStop } from '../scheduler/scheduler';
import { StepSequencer } from "../scheduler/sequencers";
import { FlowGraphContext ,FlowGraphContextType } from '../graph/flow';
import { NodeProps, Node, XYPosition } from "@xyflow/react";
import { globalScheduler } from '../scheduler/scheduler';

import { Handle, Position }   from '@xyflow/react';


interface TogglableBoxProps {
  isToggled: boolean;
  toggle: () => void;
  isActive: boolean;
}

const TogglableBox = ({ isToggled, toggle, isActive }: TogglableBoxProps) => (
  <div
    style={{
      width: 20,
      height: 20,
      border: `4px solid ${isActive ? "orange" : "transparent"}`,
      backgroundColor: isToggled ? "#555" : "#bbb",
      margin: 2,
      display: "inline-block",
      borderRadius: "1px",
    }}
    onClick={toggle}
  />
);
// Define the custom data for the Sequencer node
export type SequencerNodeData = {
  /** Example field: label or name of the sequencer node */
  label: string;
  // ... (other custom data fields for the sequencer can be added here)
  cols: number;
  rows: number;
  grid: boolean[][];
  loop: boolean;
};
// Define the full node type for a Sequencer node, including id, position, and data
export type SequencerNodeType = Node<SequencerNodeData, 'sequencer'>;



// The Sequencer component typed with NodeProps of our SequencerNodeType
export const Sequencer: React.FC<NodeProps<SequencerNodeType>> = (props) => {
  
  const { id, data, selected, isConnectable, dragging, type, positionAbsoluteX, positionAbsoluteY } = props;
  
  const flowGraph = useContext(FlowGraphContext) as FlowGraphContextType;
// Inside sequencer.tsx
const defaultCols = 16;
const defaultRows = 2;
const defaultGrid = Array(16).fill(null).map(() => Array(2).fill(false));

const colsFromData = data?.cols ?? 16;
const rowsFromData = data?.rows ?? 2;

const [cols, setNoCols] = useState<number>(colsFromData);
const [rows, setNoRows] = useState<number>(rowsFromData);
const [loop, setDoLoop] = useState<boolean>(data?.loop ?? true);

const [grid, setBangGrid] = useState<boolean[][]>(
  data?.grid || Array(colsFromData).fill(null).map(() => Array(rowsFromData).fill(false))
);



useEffect(() => {
  const newData = {
    "bang-grid": grid,
    "no-cols": cols,
    "no-rows": rows,
    "do-loop": loop,
  };

  const currentNodeData = flowGraph.getNodeData(id);
  
  // Shallow comparison to avoid loops
  if (!_.isEqual(newData, currentNodeData)) {
    flowGraph.setNodeData(id, newData);
  }
}, [grid, cols, rows, loop, flowGraph, id]);

  useEffect(() => {
    const handleGlobalStop = () => {
      // clear something or reset state
      flowGraph.deleteNode(id);
    };

    globalScheduler.on("stop", handleGlobalStop);

    return () => {
      globalScheduler.off("stop", handleGlobalStop);
    };
  }, [flowGraph, globalScheduler]);
  
  useEffect(() => {
    setBangGrid(prev => {
      const currentCols = prev.length;
      const currentRows = prev[0]?.length || 0;

      let newGrid = [...prev];

      if (currentCols < cols) {
        const addedCols = Array(cols - currentCols).fill(null).map(() => Array(currentRows).fill(false));
        newGrid = [...newGrid, ...addedCols];
      } else if (currentCols > cols) {
        newGrid = newGrid.slice(0, cols);
      }

      newGrid = newGrid.map(col => {
        if (col.length < rows) {
          const extraRows = Array(rows - col.length).fill(false);
          return [...col, ...extraRows];
        } else if (col.length > rows) {
          return col.slice(0, rows);
        }
        return col;
      });

      return newGrid;
    });
  }, [cols, rows]);

  const flipRowCol = (rowI: number, colI: number) => {
    setBangGrid(grid => grid.map((col, colIdx) => colIdx !== colI ? col : col.map((val, rowIdx) => rowIdx !== rowI ? val : !val)));
  };

  const [stepCursor, setStepCursor] = useState(-1);

  const bangOutCallbacks: Function[] = flowGraph.getBangOutputHandlers(id, rows);
  
  const stepSeqCallback = useCallback((time: any, col: boolean[], i: number) => {
    col.forEach((value, row) => {
      if (value && bangOutCallbacks[row]) bangOutCallbacks[row](time);
    });
    time.scheduleDraw(() => setStepCursor(i));
  }, [bangOutCallbacks]);
  

  const [stepSeq] = useState(() => new StepSequencer(stepSeqCallback, b("0:0:1")));

  useEffect(() => {
    stepSeq.setValues(grid);
    stepSeq.setDoLoop(loop);
  
    return () => {
      if (typeof stepSeq.dispose === 'function') {
        stepSeq.dispose();
      }
    };
  }, [grid, loop, stepSeq]);
  
  

  
  const bangGridT = _.zip(...grid);

  return (
    <div className="w-[20rem] h-[20rem]">
        <NumberInputer value={rows} onChange={setNoRows} /> x
        <NumberInputer value={cols} onChange={setNoCols} />
        
          Loop
     {_.zip(...grid).map((row, rowI) => (
        <div key={rowI}>
          {row.map((value, colI) => (
            <TogglableBox
            isToggled={value ?? false}
            toggle={() => flipRowCol(rowI, colI)}
              key={colI}
              isActive={stepCursor === colI}
            />
          ))}
          </div>

      ))}

<Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

