/** @jsx jsx */

import React from 'react';
import moment from 'moment';
import {css, jsx} from '@emotion/core';
import {Badges, Reasons} from '../../../constants/reasons';
import {Mode} from '../index';
import {NotificationIconWrapper} from './ui/ui';

const themeColor = '#27B768';

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
        return <i className="fas fa-fire" css={css`color: #e91e63`}></i>;
      case Badges.COMMENTS:
        return <i className="fas fa-user-friends" css={css`color: #4C84FF`}></i>;
      case Badges.OLD:
        return <i className="fas fa-stopwatch" css={css`color: #fcc419`}></i>;
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
      return 'See all of the notifications that matter to you';
    case Mode.HOT:
      return 'Some currently very active threads you care about';
    case Mode.COMMENTS:
      return 'Issues and pull requests that have a lot of comments';
    case Mode.OLD:
      return 'Older threads that need your review';
    default:
      return 'See all of the notifications that matter to you';
  }
}
