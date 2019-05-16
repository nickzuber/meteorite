/** @jsx jsx */

import React from 'react';
import {css, jsx} from '@emotion/core';
import {isMobile} from 'react-device-detect';

export const withOnEnter = WrappedComponent => ({onEnter, ...props}) => (
  <WrappedComponent
    {...props}
    onKeyPress={event => {
      if (event.key === 'Enter') {
        onEnter(event);
      }
    }}
  />
);

class Tooltip extends React.Component {
  constructor (props) {
    super(props);

    this.id = ('tooltip-id-' + Math.random()).replace(/\./g, '');
  }

  static defaultProps = {
    tooltipOffsetX: 0,
    tooltipOffsetY: 0,
    tooltipSpeed: 350
  }

  getTooltipElement = () => document.querySelector(`#${this.id}`);

  onMouseEnter = event => {
    if (this.getTooltipElement()) {
      return;
    }

    const {tooltipOffsetX, tooltipOffsetY} = this.props;
    const {x, y} = event.target.getBoundingClientRect();
    const text = document.createTextNode(this.props.message);
    const tooltipElement = document.createElement('div');

    tooltipElement.setAttribute('id', this.id);
    tooltipElement.setAttribute('class', 'react-tooltip');
    tooltipElement.setAttribute(
      'style',
      `top: ${y + tooltipOffsetY + window.scrollY}px; left: ${x + tooltipOffsetX}px;`
    );
    tooltipElement.appendChild(text);

    document.querySelector('body').appendChild(tooltipElement);

    this.timeout = setTimeout(() => {
      tooltipElement.setAttribute(
        'style',
        `top: ${y + tooltipOffsetY + window.scrollY}px; left: ${x + tooltipOffsetX}px; opacity: .83;`
      );
    }, this.props.tooltipSpeed);
  }

  removeTooltip = () => {
    clearTimeout(this.timeout);
    const tooltipElement = this.getTooltipElement();
    if (tooltipElement) {
      tooltipElement.parentNode.removeChild(tooltipElement);
    }
  }

  render () {
    return this.props.children({
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.removeTooltip,
      onMouseDown: this.removeTooltip,
    });
  }
}

export const withTooltip = WrappedComponent => ({
    tooltip,
    tooltipOffsetX,
    tooltipOffsetY,
    tooltipSpeed,
    ...props
  }) => (
    <Tooltip
      message={tooltip}
      tooltipOffsetX={tooltipOffsetX}
      tooltipOffsetY={tooltipOffsetY}
      tooltipSpeed={tooltipSpeed}
    >
      {mouseEvents => tooltip ? (
        <WrappedComponent {...props} {...mouseEvents} />
      ) : (
        <WrappedComponent {...props} />
      )}
    </Tooltip>
);

function transformEventsForMobile (props) {
  return Object.keys(props).reduce((aux, prop) => {
    let propT = prop;
    switch (prop) {
      case 'onClick': propT = 'onTouchEnd'; break;
      // ...
    }
    aux[propT] = props[prop];
    return aux;
  }, {});
}

function transformEvents (props) {
  return isMobile
    ? transformEventsForMobile(props)
    : props;
}

export const withOptimizedTouchEvents = BaseComponent => props => (
  <BaseComponent {...props} />
);
