import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRecentlyPlayed } from '../../concepts/play-history';

class Feature extends Component {
  componentDidMount() {
    this.props.fetchRecentlyPlayed();
  }

  renderList() {
    if (!Array.isArray(this.props.history) || this.props.history.length === 0) {
      return <h1>No recent play history available.</h1>;
    } else {
      return this.props.history.map(listen => {
        return (
          <div key={listen.played_at}>
            <h3>
              {listen.track.name} by {listen.track.artists[0].name}
            </h3>
          </div>
        );
      });
    }
  }

  render() {
    console.log(this.props.history);
    return (
      <div>
        <h1>Feature!</h1>
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.history.data
  };
};

const mapDispatchToProps = { fetchRecentlyPlayed };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feature);
