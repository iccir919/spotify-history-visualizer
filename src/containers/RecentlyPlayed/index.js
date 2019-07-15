import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Nav, Row, Col } from 'react-bootstrap';
import { compose } from 'redux';

import { fetchRecentlyPlayed } from '../../actions/recentlyPlayed';
import Header from '../../components/Header';
import RecentList from '../../components/RecentList';
import requireAuth from '../../components/requireAuth';

import './RecentlyPlayed.css';

class RecentlyPlayed extends Component {
  componentDidMount() {
    this.props.fetchRecentlyPlayed();
  }

  render() {
    return (
      <div className="top-artists-page">
        <Header />
        <h1 className="page-header">Recently Played</h1>
        <h3 className="page-sub-header">
          Get ready to feel cool. Or much less cool than you thought.
        </h3>
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <RecentList tracks={this.props.tracks} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = { fetchRecentlyPlayed };

const mapStateToProps = state => {
  return {
    tracks: state.recentlyPlayed.tracks
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  requireAuth
)(RecentlyPlayed);
