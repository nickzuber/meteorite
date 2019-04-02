import React from 'react';
import {default as RedesignScene} from './redesign/Scene';

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */

export default function Scene ({
  onMarkAsRead,
  ...props
}) {
  const loading = props.isSearching || props.isFetchingNotifications;
  const isFirstPage = props.page === 1;
  const isLastPage = props.page === props.lastPage;

  return (
    <RedesignScene
      loading={loading}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      onArchiveThread={onMarkAsRead}
      {...props}
    />
  );
}
