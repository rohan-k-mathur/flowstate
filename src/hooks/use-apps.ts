'use client';
import { useEffect, useState } from 'react';

export function useApps() {
  const [apps, setApps] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/apps')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch apps');
        return res.json();
      })
      .then((data) => {
        setApps(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { apps, isLoading, error };
}
