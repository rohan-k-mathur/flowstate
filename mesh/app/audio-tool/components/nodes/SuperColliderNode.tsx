import React, { useState } from 'react';
import AceEditor from 'react-ace';
import { Handle, Position } from 'react-flow-renderer';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

type SuperColliderNodeProps = {
  id: string;
  data: {
    initialCode?: string;
  };
};

const DEFAULT_SC_CODE = `// SuperCollider example
SynthDef("sineSynth", {
    |freq = 440|
    Out.ar(0, SinOsc.ar(freq) * 0.1)
}).play;`;

export const SuperColliderNode = ({ id, data }: SuperColliderNodeProps) => {
  const [code, setCode] = useState(data.initialCode || DEFAULT_SC_CODE);
  const [response, setResponse] = useState('');

  const executeCode = async () => {
    const res = await fetch('/api/supercollider', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const json = await res.json();
    setResponse(JSON.stringify(json.result, null, 2));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-3">
      <Handle type="target" position={Position.Top} />
      
      <AceEditor
        mode="javascript"
        theme="github"
        width="400px"
        height="200px"
        value={code}
        onChange={(newCode) => setCode(newCode)}
        name={`sc-editor-${id}`}
        editorProps={{ $blockScrolling: true }}
      />

      <button
        onClick={executeCode}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Execute
      </button>

      {response && (
        <pre className="mt-2 bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
          {response}
        </pre>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
