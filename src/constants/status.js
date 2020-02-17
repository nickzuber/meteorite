export const Status = {
  QUEUED: 'queued', // Unread
  STAGED: 'staged', // Read
  CLOSED: 'closed',  // Archived

  // Updated naming, support both for bc.
  Unread: 'queued',
  Read: 'staged',
  Archived: 'closed',
  Pinned: 'pinned', // Same idea as "PinnedUnread"
  PinnedRead: 'pinned-read'
};
