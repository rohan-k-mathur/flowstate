import type { ActionField } from '@/hooks/use-action-fields';

export const mockActionFields: Record<string, Record<string, ActionField[]>> = {
  gmail: {
    'send-email': [
      { label: 'From', key: 'from', type: 'string', required: true },
      { label: 'To', key: 'to', type: 'string', required: true },
      { label: 'Subject', key: 'subject', type: 'string', required: true },
      { label: 'Message', key: 'message', type: 'textarea', required: true },
    ],
  },
};
