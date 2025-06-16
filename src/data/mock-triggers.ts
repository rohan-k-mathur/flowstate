export const mockTriggers: Record<string, { key: string; name: string }[]> = {
  gmail: [
    { key: 'new-email', name: 'New Email' },
    { key: 'label-added', name: 'Label Added' },
  ],
  slack: [
    { key: 'new-message', name: 'New Message' },
    { key: 'channel-created', name: 'Channel Created' },
  ],
  github: [
    { key: 'push', name: 'Push' },
    { key: 'new-issue', name: 'New Issue' },
  ],
  notion: [
    { key: 'page-created', name: 'Page Created' },
    { key: 'database-updated', name: 'Database Updated' },
  ],
};
