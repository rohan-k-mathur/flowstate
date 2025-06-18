'use client';
import { useEffect, useState } from 'react';
import { getAuthToken } from '@/lib/auth';
import { mockActions } from '@/data/mock-actions';
import { localActions } from '@/lib/local-actions';

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
        const headers: HeadersInit = {};
        const token = getAuthToken();
        if (token) {
          headers['Authorization'] = token;
        }
        const res = await fetch(`/api/apps/${appKey}/actions`, { headers });
        if (!res.ok) throw new Error('Failed to fetch actions');
        const json = await res.json();
        setActions(json.data);
      } catch (err) {
        setActions(localActions[appKey] || mockActions[appKey] || []);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActions();
  }, [appKey]);

  return { actions, isLoading, error };
}
