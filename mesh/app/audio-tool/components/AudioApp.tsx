'use client';

import {  Row, Col } from 'antd';
import 'antd/dist/reset.css';
import './App.css';
import { ReactFlowProvider } from '@xyflow/react';

import  GraphView  from './views/graphView';
import  StorageController  from './views/storageController';
import { FlowGraphProvider } from './graph/flow';


export default function AudioApp() {
  return (

        <FlowGraphProvider>
        <ReactFlowProvider>

              <GraphView />
              </ReactFlowProvider>

              <StorageController />
        </FlowGraphProvider>
  );
}
