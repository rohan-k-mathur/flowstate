'use client';
import { useEffect, useState } from 'react';

export function useTriggers(appKey?: string) {
  const [triggers, setTriggers] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!appKey) return;

    const fetchTriggers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/apps/${appKey}/triggers`);
        if (!res.ok) throw new Error('Failed to fetch triggers');
        const json = await res.json();
        setTriggers(json.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTriggers();
  }, [appKey]);

  return { triggers, isLoading, error };
}
