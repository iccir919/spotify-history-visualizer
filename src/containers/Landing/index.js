import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from '../../assets/logo.png';
import './Landing.css';
import { authorizeUser, verifyToken } from '../../actions/auth';

class Landing extends Component {
  componentDidMount() {
    this.props.verifyToken();
  }

  componentDidUpdate() {
    if (this.props.token) {
      this.props.history.push('/topArtists');
    }
  }

  render() {
    return (
      <div className="landing-page">
        <div className="reduxify-landing-logo">
          <img src={logo} />
          Reduxify
        </div>
        <h2 className="catch-phrase">You are what you stream</h2>
        <h3 className="directions">
          Log-in to interact with your recent Spotify history
        </h3>
        <button
          id="login-button"
          onClick={this.props.authorizeUser}
          className="button-rounded"
        >
          <div className="text">Get Started</div>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = { authorizeUser, verifyToken };

const mapStateToProps = state => {
  return { token: state.auth.token };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
