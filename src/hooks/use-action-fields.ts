import { useEffect, useState } from 'react';
import { getAuthToken } from '@/lib/auth';
import { mockActionFields } from '@/data/mock-action-fields';

export interface ActionFieldOption {
  label: string;
  value: string;
}

export interface ActionField {
  label: string;
  key: string;
  type: 'string' | 'dropdown' | 'dynamic' | 'textarea';
  required?: boolean;
  description?: string;
  options?: ActionFieldOption[];
  /**
   * Nested fields for `dynamic` field types.
   */
  fields?: ActionField[];
}

export function useActionFields(appKey?: string, actionKey?: string) {
  const [fields, setFields] = useState<ActionField[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!appKey || !actionKey) return;

    const fetchFields = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const headers: HeadersInit = {};
        const token = getAuthToken();
        if (token) headers['Authorization'] = token;
        const res = await fetch(`/api/apps/${appKey}/actions/${actionKey}` , { headers });
        if (!res.ok) throw new Error('Failed to fetch action fields');
        const json = await res.json();
        setFields(json.data);
      } catch (err) {
        setFields(mockActionFields[appKey]?.[actionKey] || null);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFields();
  }, [appKey, actionKey]);

  return { fields, isLoading, error };
}
