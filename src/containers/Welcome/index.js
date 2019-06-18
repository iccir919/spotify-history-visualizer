import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authorizeUser, verifyToken } from '../../concepts/auth';

class Welcome extends Component {
  componentDidMount() {
    this.props.verifyToken();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Welcome!</h1>
        <button onClick={this.props.authorizeUser}>Sign in with Spotify</button>
      </div>
    );
  }
}

const mapDispatchToProps = { authorizeUser, verifyToken };

export default connect(
  null,
  mapDispatchToProps
)(Welcome);
