import React, { useContext, useState, useEffect } from 'react';
import { FlowGraphContext } from '../graph/flow';
import { useReactFlow } from 'reactflow';
import useAIWorkflow from './useAIWorkflow';

export const AIAssistant = () => {
    const [prompt, setPrompt] = useState("");
    const { workflow, loading, fetchWorkflow } = useAIWorkflow();
    const { setElements } = useContext(FlowGraphContext);

    const applyWorkflow = () => {
        if(workflow) {
            setElements([...workflow.nodes, ...workflow.edges]);
        }
    };

    return (
        <div className="ai-panel">
            <textarea placeholder="Describe your workflow" value={prompt} onChange={e => setPrompt(e.target.value)} />
            <button onClick={() => fetchWorkflow(prompt)}>Generate</button>
            {loading && <span>Loading...</span>}
            <button onClick={applyWorkflow}>Apply Workflow</button>
        </div>
    );
};
