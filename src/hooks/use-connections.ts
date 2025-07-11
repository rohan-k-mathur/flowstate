'use client';
import { useEffect, useState } from 'react';
import { getAuthToken } from '@/lib/auth';

export interface Connection {
  id: string;
  name: string;
}

export function useConnections(appKey?: string): {
  connections: Connection[] | null;
  isLoading: boolean;
  error: Error | null;
} {
  const [connections, setConnections] = useState<Connection[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!appKey) return;

    const fetchConnections = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const headers: HeadersInit = {};
        const token = getAuthToken();
        if (token) {
          headers['Authorization'] = token;
        }
        const res = await fetch(`/api/apps/${appKey}/connections`, { headers });
        if (!res.ok) throw new Error('Failed to fetch connections');
        const json = await res.json();
        setConnections(json.data);
      } catch (err) {
        setConnections(null);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConnections();
  }, [appKey]);

  return { connections, isLoading, error };
}

