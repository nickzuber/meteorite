/** @jsx jsx */

import React from 'react';
import moment from 'moment';
import {css, jsx} from '@emotion/core';
import {Badges, Reasons} from '../../../constants/reasons';
import {Mode} from '../index';
import {NotificationIconWrapper} from './ui/ui';

const themeColor = '#27B768';
export const Colors = [
  '#1c7ed6',
  '#ae3ec9',
  '#e67700',
  '#2f9e44'
];

const BadgeColors = {
  RED: '#e91e63',
  YELLOW: '#ecc962',
  BLUE: '#4C84FF'
}

export function colorOfString (str = '') {
  let i = str.split('').reduce((n, c) => (n + c.charCodeAt()) % Colors.length, 0);
  return Colors[i];
}

export function colorOfTag (tag = '') {
  const base = tag.split('-')[0];
  return colorOfString(base);
}

export function extractJiraTags (str) {
  // Remove any surrounding whitespace.
  str = str.trim();

  const State = {
    OPEN_TAG: 0,
    TAG: 1,
    CLOSE_TAG: 2,
    TEXT: 3
  };
  const tags = [];
  let curTag = ''
  let title = '';
  let state = State.TEXT;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    switch (state) {
      case State.TEXT:
        if (char === '[') {
          state = State.OPEN_TAG;
        } else {
          state = State.TEXT;
          title += char;
        }
        break;
      case State.OPEN_TAG:
      case State.TAG:
        if (char === ']') {
          state = State.CLOSE_TAG;
        } else if (char === ',') {
          state = State.OPEN_TAG;
          tags.push(curTag.trim());
          curTag = '';
        } else {
          curTag += char;
        }
        break;
      case State.CLOSE_TAG:
        state = State.TEXT;
        tags.push(curTag.trim());
        curTag = '';
        // Subtract 1 from the index because the character we're looking at
        // right now is the character that's after the closing bracket.
        // We still want to process that one fairly.
        i = i - 1;
        break;
    }
  }

  // Clean the title by normalizing any inconsistent spacing.
  // Basically convert 'a   b  c' -> 'a b c'.
  // This also trims the string for free.
  title = title.split(' ').filter(Boolean).join(' ');

  return {tags, title};
}

export function stringOfError (errorText) {
  switch (errorText) {
    case 'Unauthorized':
      return 'Your credentials have expired. You probably need to log out and back in to fix this.';
    default:
      return errorText || 'Check your internet connection';
  }
}

export function getPRIssueIcon (type, _reasons) {
  switch (type) {
    case 'PullRequest':
      return (
        <NotificationIconWrapper css={css`background: ${themeColor}29;`}>
          <i className="fas fa-code-branch" css={css`
            color: ${themeColor};
            font-size: 18px;
          `}></i>
        </NotificationIconWrapper>
      );
    case 'Issue':
      return (
        <NotificationIconWrapper css={css`background: #DBE7FF;`}>
          <i className="fas fa-exclamation" css={css`
            color: #4C84FF;
            font-size: 18px;
          `}></i>
        </NotificationIconWrapper>
      );
    default:
      return null;
  }
}
export function getRelativeTime (time) {
  const currentTime = moment();
  const targetTime = moment(time);
  const diffMinutes = currentTime.diff(targetTime, 'minutes');
  if (diffMinutes < 1)
    return 'Just now';
  if (diffMinutes < 5)
    return 'Few minutes ago';
  if (diffMinutes < 60)
    return diffMinutes + ' minutes ago';
  if (diffMinutes < 60 * 24)
    return Math.floor(diffMinutes / 60) + ' hours ago';

  const diffDays = currentTime.diff(targetTime, 'days');
  if (diffDays === 1)
    return 'Yesterday';
  if (diffDays <= 7)
    return 'Last ' + targetTime.format('dddd');
  // @TODO implement longer diffs
  return 'Over a week ago';
}

export function getMessageFromReasons (reasons, type) {
  switch (reasons[reasons.length - 1].reason) {
    case Reasons.ASSIGN:
      return 'You were assigned';
    case Reasons.AUTHOR:
      return 'There was activity on this thread you created';
    case Reasons.COMMENT:
      return 'Somebody left a comment';
    case Reasons.MENTION:
      return 'You were mentioned';
    case Reasons.REVIEW_REQUESTED:
      return 'Your review was requested';
    case Reasons.SUBSCRIBED:
      return 'There was an update and you\'re subscribed';
    case Reasons.OTHER:
    default:
      return 'Something was updated';
  }
}

export function iconsOfBadges (badges) {
  return badges.map(badge => {
    switch (badge) {
      case Badges.HOT:
        return <i className="fas fa-fire" css={css`color: ${BadgeColors.RED}`}></i>;
      case Badges.COMMENTS:
        return <i className="fas fa-user-friends" css={css`color: ${BadgeColors.BLUE}`}></i>;
      case Badges.OLD:
        return <i className="fas fa-stopwatch" css={css`color: ${BadgeColors.YELLOW}`}></i>;
      default:
        return null;
    }
  }).filter(Boolean);
}

export function createColorOfScore (min, max) {
  return function (score) {
    const ratio = (score - min) / (max - min);
    if (ratio > .9) return '#ec1461';
    if (ratio > .8) return '#ec5314';
    if (ratio > .7) return '#ec5314';
    if (ratio > .6) return '#ec7b14';
    if (ratio > .5) return '#ec7b14';
    if (ratio > .4) return '#ec9914';
    if (ratio > .3) return '#ec9914';
    if (ratio > .2) return '#ecad14';
    if (ratio > .1) return '#ecad14';
    return '#ecc114';
  }
}

export function getPercentageDelta (n, o) {
  if (n === o) {
    return 0;
  } else if (n > o) {
    return (n - o) / o * 100;
  } else {
    return (o - n) / o * 100;
  }
}

export function prettify (n) {
  if (Math.floor(n) === n) {
    return n.toString();
  } else {
    return n.toFixed(1);
  }
}

export function titleOfMode (mode) {
  switch (mode) {
    case Mode.ALL:
      return 'All Relevent Threads';
    case Mode.HOT:
      return 'Hot Threads';
    case Mode.COMMENTS:
      return 'Talkative Threads';
    case Mode.OLD:
      return 'Overdue Threads';
    default:
      return 'Updates';
  }
}

export function subtitleOfMode (mode) {
  switch (mode) {
    case Mode.ALL:
      return 'All of the notifications that matter to you';
    case Mode.HOT:
      return 'Some currently very active threads you care about';
    case Mode.COMMENTS:
      return 'Issues and pull requests that have a lot of comments';
    case Mode.OLD:
      return 'Older threads that need your review';
    default:
      return 'All of the notifications that matter to you';
  }
}
