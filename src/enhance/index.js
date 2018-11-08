import React from 'react';

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
    tooltipOffsetY: 0
  }

  getTooltipElement = () => document.querySelector(`#${this.id}`);

  onMouseEnter = event => {
    if (this.getTooltipElement()) {
      return;
    }

    const {tooltipOffsetX, tooltipOffsetY} = this.props;
    const {x, y, height} = event.target.getBoundingClientRect();
    const text = document.createTextNode(this.props.message);
    const tooltipElement = document.createElement('div');

    tooltipElement.setAttribute('id', this.id);
    tooltipElement.setAttribute('class', 'react-tooltip');
    tooltipElement.setAttribute(
      'style',
      `top: ${y + tooltipOffsetY}px; left: ${x + tooltipOffsetX}px;`
    );
    tooltipElement.appendChild(text);

    document.querySelector('body').appendChild(tooltipElement);

    this.timeout = setTimeout(() => {
      tooltipElement.setAttribute(
        'style',
        `top: ${y + tooltipOffsetY}px; left: ${x + tooltipOffsetX}px; opacity: .83;`
      );
    }, 500);
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

export const withTooltip = WrappedComponent => ({tooltip, tooltipOffsetX, tooltipOffsetY, ...props}) => (
  <Tooltip
    message={tooltip}
    tooltipOffsetX={tooltipOffsetX}
    tooltipOffsetY={tooltipOffsetY}
  >
    {mouseEvents => tooltip ? (
      <WrappedComponent {...props} {...mouseEvents} />
    ) : (
      <WrappedComponent {...props} />
    )}
  </Tooltip>
);
