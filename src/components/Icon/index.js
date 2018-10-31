import React from 'react';
import styled from 'react-emotion';

import allInbox from './svg/all_inbox.svg';
import back from './svg/back.svg';
import bolt from './svg/bolt.svg';
import bookmarkAlt from './svg/bookmark-alt.svg';
import bookmark from './svg/bookmark.svg';
import bookmarks from './svg/bookmarks.svg';
import check from './svg/check.svg';
import doneAll from './svg/done-all.svg';
import done from './svg/done.svg';
import hot from './svg/hot.svg';
import inbox from './svg/inbox.svg';
import locked from './svg/locked.svg';
import menu from './svg/menu.svg';
import next from './svg/next.svg';
import refresh from './svg/refresh.svg';
import search from './svg/search.svg';
import settings from './svg/settings.svg';
import starAlt from './svg/star-alt.svg';
import star from './svg/star.svg';
import unlocked from './svg/unlocked.svg';
import x from './svg/x.svg';


const SvgIcon = styled('div')({
  position: 'relative',
  backgroundSize: 'cover'
}, ({size, icon, opacity}) => ({
  height: size || 24,
  width: size || 24,
  background: `url(${icon}) center center no-repeat`,
  opacity
}));

export default function Icon ({src, ...props}) {
  return <SvgIcon {...props} icon={src} />
}

const createIcon = src => props => <Icon {...props} src={src} />;

Icon.AllInbox = createIcon(allInbox);
Icon.Back = createIcon(back);
Icon.Bolt = createIcon(bolt);
Icon.BookmarkAlt = createIcon(bookmarkAlt);
Icon.Bookmark = createIcon(bookmark);
Icon.Bookmarks = createIcon(bookmarks);
Icon.Check = createIcon(check);
Icon.DoneAll = createIcon(doneAll);
Icon.Done = createIcon(done);
Icon.Hot = createIcon(hot);
Icon.Inbox = createIcon(inbox);
Icon.Locked = createIcon(locked);
Icon.Menu = createIcon(menu);
Icon.Next = createIcon(next);
Icon.Refresh = createIcon(refresh);
Icon.Search = createIcon(search);
Icon.Settings = createIcon(settings);
Icon.StarAlt = createIcon(starAlt);
Icon.Star = createIcon(star);
Icon.Unlocked = createIcon(unlocked);
Icon.X = createIcon(x);
