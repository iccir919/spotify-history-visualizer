import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Landing.css';

import { authorizeUser, verifyToken } from '../../concepts/auth';

class Welcome extends Component {
  componentDidMount() {
    this.props.verifyToken();
  }

  render() {
    return (
      <div id="landing-page">
        <h1>You are what you stream</h1>
        <h3>Log-in to see experience recent Spotify history</h3>
        <button
          style={{ opacity: '1' }}
          id="login-button"
          onClick={this.props.authorizeUser}
          className="button-rounded large"
        >
          <div className="text">Get Started</div>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = { authorizeUser, verifyToken };

export default connect(
  null,
  mapDispatchToProps
)(Welcome);
