'use client';
import { useEffect, useState } from 'react';

export function useApps() {
  const [apps, setApps] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchApps = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/apps');
        if (!res.ok) throw new Error('Failed to fetch apps');
        const json = await res.json();
        setApps(json.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApps();
  }, []);

  return { apps, isLoading, error };
}
