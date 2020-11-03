/** @jsx jsx */

import React from 'react';
import styled from '@emotion/styled';
import Typed from 'typed.js';
import moment from 'moment';
import {css, jsx} from '@emotion/core';
import LoadingIcon from '../../../components/LoadingIcon';
import {colorOfString, colorOfTag, extractJiraTags} from './utils';
import {
  withTheme,
  DarkTheme,
  WHITE,
  SearchField,
  EnhancedSearchInput,
  Dropdown,
  FilterItem,
  JiraTag
} from './ui';

function TypedSpan({source, toString, options = {}}) {
  const spanRef = React.useRef();
  const typed = React.useRef();

  function clean(string) {
    const illegalChars = new Set(['-']);
    return string
      .split(' ')
      .filter(char => !illegalChars.has(char))
      .join(' ');
  }

  React.useEffect(
    () => {
      const defaultOptions = {
        strings: source.map(toString).map(clean),
        startDelay: 100,
        typeSpeed: 50,
        backSpeed: 15,
        backDelay: 3000,
        loop: true,
        ...options
      };
      typed.current = new Typed(spanRef.current, defaultOptions);
      return () => typed.current.destroy();
    },
    [source]
  );

  return (
    <span
      css={css`
        display: inline-block;
        text-transform: initial;
        padding: 0;
        margin: 0;
        font-weight: 500;
        margin-left: 4px;
        font-size: 13px;
        color: inherit;
      `}
      ref={spanRef}
    />
  );
}

const SearchFilters = {
  TITLE: 'title',
  REPO: 'repo',
  SCORE: 'score'
};

function FilterTagInline({type}) {
  const seed = Object.values(SearchFilters).indexOf(type);
  const color = colorOfString(type, seed + 2);
  return (
    <span
      css={css`
        background: ${color}28;
        color: ${color};
        padding: 2px 4px;
        border-radius: 4px;
        font-weight: 600;
        font-size: 10px;
        text-transform: uppercase;
        margin-left: 0;
        position: absolute;
        left: 40px;
        width: 32px;
        text-align: center;
      `}
    >
      {type}
    </span>
  );
}

function FilterTag({type}) {
  const seed = Object.values(SearchFilters).indexOf(type);
  const color = colorOfString(type, seed + 2);
  return (
    <span
      css={css`
        background: ${color}28;
        color: ${color};
        padding: 2px 4px;
        border-radius: 4px;
        font-weight: 600;
        font-size: 10px;
        text-transform: uppercase;
        margin-left: 0;
      `}
    >
      {type}
    </span>
  );
}

const Suggestion = withTheme(
  styled('div')(
    p => `
    display: block;
    padding: 12px 16px;
    font-weight: 500;
    font-size: 13px;
    cursor: pointer;
    transition: all 200ms ease;

    &:hover {
      background: ${p.dark ? '#273947' : '#eff0f2'};
    }
`
  )
);

const SuggestionTitle = withTheme(
  styled('p')(
    p => `
  display: inline-block;
  text-transform: initial;
  padding: 0;
  margin: 0;
  font-weight: 500;
  color: ${p.dark ? WHITE : 'inherit'};
  font-size: 13px;
`
  )
);

const SuggestionRepo = styled('p')`
  text-transform: initial;
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 12px;
  color: #8893a7cc;
`;

function validateFilter(filter) {
  const exists = Object.values(SearchFilters).includes(filter);
  return exists ? filter : null;
}

function parseTextForFilter(input, currentFilter) {
  // Conveniently, the logic for `extractJiraTags` is exactly the
  // same logic we need for extracting the filter tags from our query.
  // So we can just reuse this method here (woo!)
  const {
    tags: appliedFilters, // The applied filters.
    title: queryText // The query.
  } = extractJiraTags(input, false);

  // We can only support one filter at a time right now.
  const activeFilter = validateFilter(appliedFilters[0]);

  return {
    filter: currentFilter || activeFilter,
    text: activeFilter ? queryText : input
  };
}

// @TODO will be used in main filter as well
function filterFromQuery({query, items, compare}) {
  query = query.toLowerCase();
  return items.filter(item => compare(item, query));
}

// -------------------------------------------------------------------------- //

export function FilterSearch({
  isSearching,
  activeQuery,
  dark,
  notifications,
  view,
  loading,
  onSearch
}) {
  const downdownRef = React.useRef();
  const searchRef = React.useRef();
  const containerRef = React.useRef();
  const [searchMenuOpened, setSearchMenuOpened] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState(null);
  const [exampleNotifications, setExampleNotifications] = React.useState([
    {
      name: 'Update README',
      repository: 'nickzuber/meteorite',
      score: 53
    },
    {
      name:
        'Update innerRef to allow React.createRef and React.forwardRef api usage',
      repository: 'robinpowered/glamorous-native',
      score: 78
    },
    {
      name: 'Refactor and test updated logic',
      repository: 'nickzuber/infrared',
      score: 35
    }
  ]);

  React.useEffect(
    () => {
      if (notifications.length >= 3) {
        const examples = notifications.slice(0, 5);
        setExampleNotifications(examples);
      }
    },
    [view]
  );

  React.useEffect(
    () => {
      if (!activeQuery) {
        setSearchInput('');
        setActiveFilter(null);
      }
    },
    [activeQuery]
  );

  function smartSetSearchInput(input) {
    const {filter, text} = parseTextForFilter(input, activeFilter);
    setSearchInput(text);
    if (input === '') {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  }

  const timer = React.useRef();
  const setSearchInputWithDelay = text => {
    timer.current = setTimeout(() => searchRef.current.focus(), 300);
    smartSetSearchInput(text);
  };
  React.useEffect(() => () => clearInterval(timer.current), []);

  React.useEffect(() => {
    const body = window.document.querySelector('body');
    const hideSearchFocused = event => {
      const dropdown = downdownRef.current;
      if (dropdown && !dropdown.contains(event.target)) {
        setSearchMenuOpened(false);
      }
    };
    body.addEventListener('click', hideSearchFocused);
    return () => body.removeEventListener('click', hideSearchFocused);
  }, []);

  function onSuggestionSelect(text) {
    setSearchInput(text);
    onSearch(text);
    setSearchMenuOpened(false);
  }

  return (
    <SearchField innerRef={containerRef}>
      <i className="fas fa-search" />
      {activeFilter && <FilterTagInline type={activeFilter} />}
      <EnhancedSearchInput
        innerRef={searchRef}
        disabled={loading}
        type="text"
        onClick={() => setSearchMenuOpened(true)}
        onChange={e => smartSetSearchInput(e.target.value)}
        value={searchInput}
        placeholder="Search for notifications"
        onEnter={() => onSearch(searchInput)}
        css={
          activeFilter
            ? css`
                padding-left: 42px;
                width: 298px;
              `
            : undefined
        }
      />
      <DropdownSection
        forwardRef={downdownRef}
        onSuggestionSelect={onSuggestionSelect}
        searchMenuOpened={searchMenuOpened}
        activeFilter={activeFilter}
        searchInput={searchInput}
        notifications={notifications}
        exampleNotifications={exampleNotifications}
        setSearchInput={setSearchInputWithDelay}
      />
      {isSearching && (
        <LoadingIcon
          size={36}
          style={{
            transition: 'all 100ms ease',
            position: 'absolute',
            right: 0,
            transform: 'scale(0.8)',
            backgroundColor: dark ? DarkTheme.SecondaryAlt : WHITE
          }}
        />
      )}
    </SearchField>
  );
}

function DropdownSection({
  forwardRef,
  onSuggestionSelect,
  searchMenuOpened,
  activeFilter,
  searchInput,
  notifications,
  exampleNotifications,
  setSearchInput
}) {
  if (!searchMenuOpened) {
    return null;
  }

  const items = filterFromQuery({
    query: searchInput,
    items: notifications,
    compare: (item, query) => {
      switch (activeFilter) {
        case SearchFilters.TITLE: {
          const words = query.split(' ');
          const itemString = item.name.toLowerCase();
          return words.every(word => itemString.includes(word));
        }
        case SearchFilters.REPO: {
          const words = query.split(' ');
          const itemString = item.repository.toLowerCase();
          return words.every(word => itemString.includes(word));
        }
        default:
          const words = query.split(' ');
          const itemString = `${item.name} ${item.repository}`.toLowerCase();
          return words.every(word => itemString.includes(word));
      }
    }
  });

  return (
    <Dropdown innerRef={forwardRef}>
      {searchInput !== '' ? (
        // Previews
        <React.Fragment>
          {items.length === 0 ? (
            <h5
              css={css`
                border-top: 0px solid transparent !important;
              `}
            >
              {"Couldn't find any notifications with this query."}
            </h5>
          ) : (
            items
              .sort((a, b) => moment(b.updated_at).diff(a.updated_at))
              .slice(0, 10)
              .map(notification => {
                const {title, tags} = extractJiraTags(notification.name);
                return (
                  <Suggestion
                    onClick={() => {
                      switch (activeFilter) {
                        case SearchFilters.TITLE:
                          return onSuggestionSelect(notification.name);
                        case SearchFilters.REPO:
                          return onSuggestionSelect(notification.repository);
                        default:
                          return onSuggestionSelect(notification.name);
                      }
                    }}
                  >
                    <SuggestionTitle>
                      {tags.map(tag => (
                        <JiraTag
                          key={tag}
                          css={css`
                            padding: 0px 4px;
                            vertical-align: text-bottom;
                          `}
                          color={colorOfTag(tag)}
                        >
                          {tag}
                        </JiraTag>
                      ))}
                      {title}
                    </SuggestionTitle>
                    <SuggestionRepo>{`@${
                      notification.repository
                    }`}</SuggestionRepo>
                  </Suggestion>
                );
              })
          )}
        </React.Fragment>
      ) : (
        // Filter Suggestion Menu
        <React.Fragment>
          <FilterItem onClick={() => setSearchInput('[title] ')}>
            <FilterTag type={SearchFilters.TITLE} />
            <TypedSpan
              source={exampleNotifications}
              toString={n => {
                const parts = n.name.split(' ');
                const length = parts.length;
                if (length > 2) {
                  return parts.slice(Math.floor(length / 2), length).join(' ');
                }
                return parts.slice(0, length).join(' ');
              }}
            />
            <p>{'Search for specific titles'}</p>
          </FilterItem>
          <FilterItem onClick={() => setSearchInput('[repo] ')}>
            <FilterTag type={SearchFilters.REPO} />
            <TypedSpan
              source={exampleNotifications}
              toString={n => n.repository.split('/')[1]}
            />
            <p>{'Search for specific repositories'}</p>
          </FilterItem>
          <h5>
            {'Not including a filter will search everything across all fields'}
          </h5>
        </React.Fragment>
      )}
    </Dropdown>
  );
}
