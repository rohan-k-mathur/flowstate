export const mockActions: Record<string, { key: string; name: string }[]> = {
  gmail: [
    { key: 'send-email', name: 'Send Email' },
    { key: 'search-emails', name: 'Search Emails' },
  ],
  slack: [
    { key: 'post-message', name: 'Post Message' },
    { key: 'create-channel', name: 'Create Channel' },
  ],
  github: [
    { key: 'create-issue', name: 'Create Issue' },
    { key: 'list-repos', name: 'List Repositories' },
  ],
  notion: [
    { key: 'create-page', name: 'Create Page' },
    { key: 'update-database', name: 'Update Database' },
  ],
};
