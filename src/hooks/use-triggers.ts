'use client';
import { useEffect, useState } from 'react';

export function useTriggers(appKey?: string) {
  const [triggers, setTriggers] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!appKey) return;
    setIsLoading(true);
    fetch(`/api/apps/${appKey}/triggers`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch triggers');
        return res.json();
      })
      .then((data) => {
        setTriggers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [appKey]);

  return { triggers, isLoading, error };
}
