import _ from 'lodash';
import { insideNodeContainer } from '../graph/nodeContainer';
import { AudioOut } from '../nodes/audioOut';
import { Sampler } from '../nodes/sampler';
import { Sequencer } from '../nodes/sequencer';
import { UrBang } from '../nodes/urBang';
import { SuperColliderNode } from '../nodes/SuperColliderNode';
import { NodeTypes } from '@xyflow/react';
import { useMemo } from "react";





export const useNodeTypes = () =>
  useMemo(
    () =>
      _.mapValues(
        { Sequencer: Sequencer }, 
        (nodeComponent) => insideNodeContainer(nodeComponent)
      ),
    [],
  );