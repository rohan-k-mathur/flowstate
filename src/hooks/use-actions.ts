'use client';
import { useEffect, useState } from 'react';

export function useActions(appKey?: string) {
  const [actions, setActions] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!appKey) return;
    setIsLoading(true);
    fetch(`/api/apps/${appKey}/actions`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch actions');
        return res.json();
      })
      .then((data) => {
        setActions(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [appKey]);

  return { actions, isLoading, error };
}
