import React from 'react';
import styled from 'react-emotion';

import alarm from './svg/alarm.svg';
import allInbox from './svg/all_inbox.svg';
import back from './svg/back.svg';
import bolt from './svg/bolt.svg';
import boltWhite from './svg/bolt-white.svg';
import bookmarkAlt from './svg/bookmark-alt.svg';
import bookmarkAltWhite from './svg/bookmark-alt-white.svg';
import bookmark from './svg/bookmark.svg';
import bookmarks from './svg/bookmarks.svg';
import check from './svg/check.svg';
import clock from './svg/clock.svg';
import convo from './svg/convo.svg';
import doneAll from './svg/done-all.svg';
import done from './svg/done.svg';
import hot from './svg/hot.svg';
import help from './svg/help.svg';
import inbox from './svg/inbox.svg';
import info from './svg/info.svg';
import inboxWhite from './svg/inbox-white.svg';
import locked from './svg/locked.svg';
import lowPriority from './svg/low_priority.svg';
import menu from './svg/menu.svg';
import next from './svg/next.svg';
import people from './svg/people.svg';
import peopleWhite from './svg/people-white.svg';
import peopleAlt from './svg/people-alt.svg';
import peopleAltWhite from './svg/people-alt-white.svg';
import prev from './svg/prev.svg';
import refresh from './svg/refresh.svg';
import search from './svg/search.svg';
import settings from './svg/settings.svg';
import starAlt from './svg/star-alt.svg';
import star from './svg/star.svg';
import trash from './svg/trash.svg';
import timer from './svg/timer.svg';
import unlocked from './svg/unlocked.svg';
import undo from './svg/undo.svg';
import user from './svg/user.svg';
import x from './svg/x.svg';

import issue_closed from './svg/github/issue-closed.svg';
import issue_open from './svg/github/issue-open.svg';
import pr_closed from './svg/github/pr-closed.svg';
import pr_open from './svg/github/pr-open.svg';
import pr_merged from './svg/github/pr-merged.svg';

const SvgIcon = styled('div')({
  position: 'relative',
  backgroundSize: 'cover',
  fontSize: 14,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}, ({size, icon, opacity, shrink}) => ({
  height: size || 24,
  width: size || 24,
  background: `url(${icon}) center center no-repeat`,
  opacity,
  transform: shrink ? `scale(${shrink})` : 'inherit'
}));

export default function Icon ({src, ...props}) {
  return <SvgIcon {...props} icon={src}>&nbsp;</SvgIcon>
}

const createIcon = src => props => <Icon {...props} src={src} />;

Icon.Alarm = createIcon(alarm);
Icon.AllInbox = createIcon(allInbox);
Icon.Back = createIcon(back);
Icon.Bolt = createIcon(bolt);
Icon.BoltWhite = createIcon(boltWhite);
Icon.BookmarkAlt = createIcon(bookmarkAlt);
Icon.BookmarkAltWhite = createIcon(bookmarkAltWhite);
Icon.Bookmark = createIcon(bookmark);
Icon.Bookmarks = createIcon(bookmarks);
Icon.Check = createIcon(check);
Icon.Clock = createIcon(clock);
Icon.Convo = createIcon(convo);
Icon.DoneAll = createIcon(doneAll);
Icon.Done = createIcon(done);
Icon.Hot = createIcon(hot);
Icon.Help = createIcon(help);
Icon.Inbox = createIcon(inbox);
Icon.Info = createIcon(info);
Icon.InboxWhite = createIcon(inboxWhite);
Icon.Locked = createIcon(locked);
Icon.LowPriority = createIcon(lowPriority);
Icon.Menu = createIcon(menu);
Icon.Next = createIcon(next);
Icon.People = createIcon(people);
Icon.PeopleWhite = createIcon(peopleWhite);
Icon.PeopleAlt = createIcon(peopleAlt);
Icon.PeopleAltWhite = createIcon(peopleAltWhite);
Icon.Prev = createIcon(prev);
Icon.Refresh = createIcon(refresh);
Icon.Search = createIcon(search);
Icon.Settings = createIcon(settings);
Icon.StarAlt = createIcon(starAlt);
Icon.Star = createIcon(star);
Icon.Trash = createIcon(trash);
Icon.Timer = createIcon(timer);
Icon.Unlocked = createIcon(unlocked);
Icon.Undo = createIcon(undo);
Icon.User = createIcon(user);
Icon.X = createIcon(x);

Icon.IssueClosed = createIcon(issue_closed);
Icon.IssueOpen = createIcon(issue_open);
Icon.PrClosed = createIcon(pr_closed);
Icon.PrOpen = createIcon(pr_open);
Icon.PrMerged = createIcon(pr_merged);
