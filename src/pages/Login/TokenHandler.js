import React from 'react';
import qs from 'query-string';

export default class TokenHandler extends React.Component {
  componentDidMount() {
    const params = qs.parse(document.location.search);
    const code = params.code;
    if (code) {
      this.props.onSetLoading(true);
      fetch(`https://meteorite-gatekeeper.herokuapp.com/authenticate/${code}`)
        .then(response => response.json())
        .then(({token, error}) => {
          this.props.onSetLoading(false);
          if (error) {
            this.props.onSetError(true);
          } else {
            this.props.setToken(token);
          }
        });
    }
  }

  render() {
    return null;
  }
}
