import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authorizeUser } from '../../concepts/auth';

class Welcome extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <button onClick={this.props.authorizeUser}>Sign in with Spotify</button>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = { authorizeUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
