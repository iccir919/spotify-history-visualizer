import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRecentlyPlayed } from '../../concepts/play-history';

class Feature extends Component {
  componentDidMount() {
    this.props.fetchRecentlyPlayed();
  }

  render() {
    return (
      <div>
        <h1>Feature!</h1>
      </div>
    );
  }
}

const mapDispatchToProps = { fetchRecentlyPlayed };

export default connect(
  null,
  mapDispatchToProps
)(Feature);
