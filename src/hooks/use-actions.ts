'use client';
import { useEffect, useState } from 'react';

export function useActions(appKey?: string) {
  const [actions, setActions] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!appKey) return;

    const fetchActions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/apps/${appKey}/actions`);
        if (!res.ok) throw new Error('Failed to fetch actions');
        const json = await res.json();
        setActions(json.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActions();
  }, [appKey]);

  return { actions, isLoading, error };
}
