/** @jsx jsx */

import React from 'react';
import Typed from 'typed.js';
import {css, jsx} from '@emotion/core';
import LoadingIcon from '../../../components/LoadingIcon';
import {colorOfString, extractJiraTags} from './utils';
import {SearchField, EnhancedSearchInput, Dropdown} from './ui';

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

  React.useEffect(() => {
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
  }, [source]);

  return <span ref={spanRef} />;
}

// @TODO will be used in main filter as well
function filterFromQuery({query, items, toString}) {
  query = query.toLowerCase();
  return items.filter(item =>
    toString(item)
      .toLowerCase()
      .includes(query)
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
        background: ${color}28 !important;
        color: ${color} !important;
        padding: 2px 6px !important;
        border-radius: 4px !important;
        font-weight: 600 !important;
        font-size: 12px !important;
        text-transform: capitalize !important;
        margin-left: 0 !important;
        position: absolute !important;
        left: 40px !important;
        width: 32px !important;
        text-align: center !important;
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
        background: ${color}28 !important;
        color: ${color} !important;
        padding: 2px 6px !important;
        border-radius: 4px !important;
        font-weight: 600 !important;
        font-size: 12px !important;
        text-transform: capitalize !important;
        margin-left: 0 !important;
      `}
    >
      {type}
    </span>
  );
}

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

export function FilterSearch({
  isSearching,
  notifications,
  view,
  loading,
  onSearch
}) {
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
        'Update innerRef to allow React.createRef and React.forwardRef api usage    ',
      repository: 'robinpowered/glamorous-native',
      score: 78
    },
    {
      name: 'Refactor and test updated logic',
      repository: 'nickzuber/infrared',
      score: 35
    }
  ]);

  React.useEffect(() => {
    if (notifications.length > 3) {
      const examples = notifications.slice(0, 5);
      setExampleNotifications(examples);
    }
  }, [view]);

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

  // Global event listeners for things like the dropdowns & popups.
  React.useEffect(() => {
    const body = window.document.querySelector('body');
    const hideSearchFocused = () => setSearchMenuOpened(false);
    const eventType = 'click'; // isMobile ? 'touchend' : 'click';
    body.addEventListener(eventType, hideSearchFocused);
    return () => body.removeEventListener(eventType, hideSearchFocused);
  }, []);

  return (
    <SearchField innerRef={containerRef}>
      <i className="fas fa-search"></i>
      {activeFilter && <FilterTagInline type={activeFilter} />}
      <EnhancedSearchInput
        innerRef={searchRef}
        disabled={loading}
        type="text"
        onClick={() => setSearchMenuOpened(true)}
        onChange={e => smartSetSearchInput(e.target.value)}
        value={searchInput}
        placeholder="Search for notifications"
        onEnter={onSearch}
        css={css`
          ${activeFilter &&
            `
            padding-left: 42px;
            width: 298px;
          `}
        `}
      />
      <DropdownSection
        searchMenuOpened={searchMenuOpened}
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
            backgroundColor: 'transparent'
          }}
        />
      )}
    </SearchField>
  );
}

function DropdownSection({
  searchMenuOpened,
  searchInput,
  notifications,
  exampleNotifications,
  setSearchInput
}) {
  if (!searchMenuOpened) {
    return null;
  }

  return (
    <Dropdown>
      {searchInput !== '' ? (
        // Previews
        <span>
          {filterFromQuery({
            query: searchInput,
            items: notifications,
            toString: item => item.name
          }).map(n => (
            <span>{n.name}</span>
          ))}
        </span>
      ) : (
        // Filter Suggestion Menu
        <React.Fragment>
          <span onMouseDown={() => setSearchInput('[title] ')}>
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
          </span>
          <span onMouseDown={() => setSearchInput('[repo] ')}>
            <FilterTag type={SearchFilters.REPO} />
            <TypedSpan
              source={exampleNotifications}
              toString={n => n.repository.split('/')[1]}
            />
            <p>{'Search for specific repositories'}</p>
          </span>
          <span onMouseDown={() => setSearchInput('[score] ')}>
            <FilterTag type={SearchFilters.SCORE} />
            <TypedSpan
              source={exampleNotifications}
              toString={n => {
                const comparator = ['>', '='][Math.floor(Math.random() * 2)];
                return `${comparator} ${n.score}`;
              }}
            />
            <p>{'Search for specific score ranges'}</p>
          </span>
          <h5>
            {'Not including a filter will search everything across all fields'}
          </h5>
        </React.Fragment>
      )}
    </Dropdown>
  );
}
