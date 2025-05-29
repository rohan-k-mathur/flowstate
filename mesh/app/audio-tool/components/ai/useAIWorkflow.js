import { useState } from 'react';

export const useAIWorkflow = () => {
    const [workflow, setWorkflow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWorkflow = async (prompt) => {
        setLoading(true);
        try {
            const res = await fetch('/api/generateWorkflow', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ prompt }),
            });
            if (!res.ok) throw new Error('Failed to fetch workflow');
            const data = await res.json();
            setWorkflow(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };
    return { workflow, loading, error, fetchWorkflow };
};
