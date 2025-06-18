'use client';
import { useEffect, useState } from 'react';
import { getAuthToken } from '@/lib/auth';
import { localApps } from '@/lib/local-apps';

export function useApps() {
  const [apps, setApps] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchApps = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const headers: HeadersInit = {};
        const token = getAuthToken();
        if (token) {
          headers['Authorization'] = token;
        }
        const res = await fetch('/api/apps', { headers });
        if (!res.ok) throw new Error('Failed to fetch apps');
        const json = await res.json();
        setApps(json.data);
      } catch (err) {
        setApps(localApps);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApps();
  }, []);

  return { apps, isLoading, error };
}
