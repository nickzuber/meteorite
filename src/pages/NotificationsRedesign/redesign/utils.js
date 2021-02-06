/** @jsx jsx */

import React from 'react';
import moment from 'moment';
import {css, jsx} from '@emotion/core';
import {Badges, Reasons} from '../../../constants/reasons';
import {Filters} from '../../../constants/filters';
import {Mode} from '../index';
import {NotificationIconWrapper, ThemeColor} from './ui/ui';

export const Colors = ['#1c7ed6', '#ae3ec9', '#e67700', '#2f9e44'];

const BadgeColors = {
  RED: '#e91e63',
  YELLOW: '#ecc962',
  BLUE: '#4C84FF'
};

export function colorOfString(str = '', seed) {
  if (typeof seed === 'number') {
    return Colors[seed % Colors.length];
  }

  let i = str
    .split('')
    .reduce((n, c) => (n + c.charCodeAt()) % Colors.length, 0);
  return Colors[i];
}

export function colorOfTag(tag = '') {
  const base = tag.split('-')[0];
  return colorOfString(base);
}

export function extractJiraTags(str, cleanTitleString = true) {
  // Remove any surrounding whitespace.
  if (cleanTitleString) {
    str = str.trim();
  }

  const State = {
    OPEN_TAG: 0,
    TAG: 1,
    CLOSE_TAG: 2,
    TEXT: 3
  };
  let tags = [];
  let curTag = '';
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
          // Subtract 1 from the index because the character we're looking at
          // right now is the character that's after the closing bracket.
          // We still want to process that one fairly.
          i = i - 1;
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
        break;
    }
  }

  // Clean the title by normalizing any inconsistent spacing.
  // Basically convert 'a   b  c' -> 'a b c'.
  // This also trims the string for free.
  if (cleanTitleString) {
    title = title
      .split(' ')
      .filter(Boolean)
      .join(' ');
  }

  // Remove any tags that are empty strings.
  tags = tags.filter(Boolean);

  return {tags, title};
}

export function stringOfError(errorText) {
  switch (errorText) {
    case 'Unauthorized':
      return 'Your credentials have expired. You probably need to log out and back in to fix this.';
    default:
      return errorText || 'Check your internet connection';
  }
}

const PinnedColor = '#fab005';
export function getPRIssueIcon({type, reasons, dark, pinned}) {
  if (pinned) {
    return (
      <NotificationIconWrapper
        css={css`
          background: ${PinnedColor}29;
        `}
      >
        <i
          className="fas fa-map-pin"
          css={css`
            color: ${PinnedColor};
            font-size: 18px;
          `}
        />
      </NotificationIconWrapper>
    );
  }

  switch (type) {
    case 'PullRequest':
      return (
        <NotificationIconWrapper
          css={css`
            background: ${ThemeColor(dark)}29;
          `}
        >
          <i
            className="fas fa-code-branch"
            css={css`
              color: ${ThemeColor(dark)};
              font-size: 18px;
            `}
          />
        </NotificationIconWrapper>
      );
    case 'Issue':
      return (
        <NotificationIconWrapper
          css={css`
            background: ${ThemeColor(dark)}29;
          `}
        >
          <i
            className="fas fa-exclamation"
            css={css`
              color: ${ThemeColor(dark)};
              font-size: 18px;
            `}
          />
        </NotificationIconWrapper>
      );
    default:
      return null;
  }
}
export function getRelativeTime(time) {
  const currentTime = moment();
  const targetTime = moment(time);
  const diffMinutes = currentTime.diff(targetTime, 'minutes');
  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 5) return 'Few minutes ago';
  if (diffMinutes < 60) return diffMinutes + ' minutes ago';
  if (diffMinutes < 60 * 24) return Math.floor(diffMinutes / 60) + ' hours ago';

  const diffDays = currentTime.diff(targetTime, 'days');
  if (diffDays === 1) return 'Yesterday';
  if (diffDays <= 7) return 'Last ' + targetTime.format('dddd');
  // @TODO implement longer diffs
  return 'Over a week ago';
}

export function getMessageFromReasons(reasons, type) {
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
      return "There was an update and you're subscribed";
    case Reasons.OTHER:
    default:
      return 'Something was updated';
  }
}

export function iconsOfBadges(badges) {
  return badges
    .map(badge => {
      switch (badge) {
        case Badges.HOT:
          return (
            <i
              className="fas fa-fire"
              css={css`
                color: ${BadgeColors.RED};
              `}
            />
          );
        case Badges.COMMENTS:
          return (
            <i
              className="fas fa-user-friends"
              css={css`
                color: ${BadgeColors.BLUE};
              `}
            />
          );
        case Badges.OLD:
          return (
            <i
              className="fas fa-stopwatch"
              css={css`
                color: ${BadgeColors.YELLOW};
              `}
            />
          );
        default:
          return null;
      }
    })
    .filter(Boolean);
}

export function createColorOfScore(min, max) {
  return function(score) {
    const ratio = (score - min) / (max - min);
    if (ratio > 0.9) return '#ec1461';
    if (ratio > 0.8) return '#ec5314';
    if (ratio > 0.7) return '#ec5314';
    if (ratio > 0.6) return '#ec7b14';
    if (ratio > 0.5) return '#ec7b14';
    if (ratio > 0.4) return '#ec9914';
    if (ratio > 0.3) return '#ec9914';
    if (ratio > 0.2) return '#ecad14';
    if (ratio > 0.1) return '#ecad14';
    return '#ecc114';
  };
}

export function getPercentageDelta(n, o) {
  if (n === o) {
    return 0;
  } else if (n > o) {
    return ((n - o) / o) * 100;
  } else {
    return ((o - n) / o) * 100;
  }
}

export function prettify(n) {
  if (Math.floor(n) === n) {
    return n.toString();
  } else {
    return n.toFixed(1);
  }
}

export function titleOfMode(mode) {
  switch (mode) {
    case Mode.ALL:
      return 'All Relevant Threads';
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

export function titleOfFilter(filter) {
  switch (filter) {
    case Filters.PARTICIPATING:
      return 'All Relevant';
    case Filters.SUBSCRIBED:
      return 'Subscribed';
    case Filters.COMMENT:
      return 'Commented';
    case Filters.ASSIGNED:
      return 'Assigned';
    case Filters.REVIEW_REQUESTED:
      return 'Requested Reviews';
    default:
      return 'Updates';
  }
}

export function subtitleOfMode(mode) {
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
