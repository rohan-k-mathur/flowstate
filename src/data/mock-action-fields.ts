import type { ActionField } from '@/hooks/use-action-fields';

export const mockActionFields: Record<string, Record<string, ActionField[]>> = {
  gmail: {
    'send-email': [
      {
        label: 'TOs',
        key: 'tos',
        type: 'dynamic',
        required: false,
        description: '',
        fields: [
          { label: 'To', key: 'to', type: 'string', required: false },
        ],
      },
      {
        label: 'CCs',
        key: 'ccs',
        type: 'dynamic',
        required: false,
        description: '',
        fields: [
          { label: 'CC', key: 'cc', type: 'string', required: false },
        ],
      },
      {
        label: 'BCCs',
        key: 'bccs',
        type: 'dynamic',
        required: false,
        description: '',
        fields: [
          { label: 'BCC', key: 'bcc', type: 'string', required: false },
        ],
      },
      {
        label: 'From',
        key: 'from',
        type: 'dropdown',
        required: false,
        description:
          'Select an email address or alias from your Gmail Account. Defaults to the primary email address.',
        options: [],
      },
      { label: 'From Name', key: 'fromName', type: 'string', required: false },
      {
        label: 'Reply To',
        key: 'replyTo',
        type: 'string',
        required: false,
        description: 'Specify a single reply address other than your own.',
      },
      { label: 'Subject', key: 'subject', type: 'string', required: true },
      {
        label: 'Body Type',
        key: 'bodyType',
        type: 'dropdown',
        required: false,
        options: [
          { label: 'plain', value: 'plain' },
          { label: 'html', value: 'html' },
        ],
      },
      { label: 'Body', key: 'emailBody', type: 'string', required: true },
      {
        label: 'Signature',
        key: 'signature',
        type: 'dropdown',
        required: false,
        options: [],
      },
    ],
  },
};
