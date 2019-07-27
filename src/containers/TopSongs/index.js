import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Nav, Row, Col } from 'react-bootstrap';
import { compose } from 'redux';

import { fetchTopSongs } from '../../actions/topSongs';
import Header from '../../components/Header';
import SongList from '../../components/SongList';
import ArtistChoice from '../../components/ArtistChoice';
import requireAuth from '../../components/requireAuth';

import './TopSongs.css';
import PopularityChart from '../../components/PopularityChart';

class TopSongs extends Component {
  state = {
    timeRange: 'long_term',
    artistSelection: 'all artists'
  };

  componentDidMount() {
    this.props.fetchTopSongs(this.state.timeRange);
  }

  handleArtistChange(artist) {
    let body = document.body; // For Safari
    let html = document.documentElement; // Chrome, Firefox, IE and Opera
    body.scrollTop = 0;
    html.scrollTop = 0;
    this.setState({
      artistSelection: artist.currentTarget.value
    });
  }

  handleTimePeriodChange(timeRange) {
    if (this.props[timeRange].length === 0) {
      this.props.fetchTopSongs(timeRange);
      this.setState({
        timeRange: timeRange,
        artistSelection: 'all artists'
      });
    } else {
      this.setState({
        timeRange: timeRange,
        artistSelection: 'all artists'
      });
    }
  }

  render() {
    console.log(this.props.long_term);
    return (
      <div className="top-artists-page">
        <Header />
        <h1 className="page-header">Top Songs</h1>
        <h3 className="page-sub-header">
          Get ready to feel cool. Or much less cool than you thought.
        </h3>
        <Container className="justify-content-center">
          <Nav
            fill
            defaultActiveKey="long_term"
            onSelect={selectedKey => this.handleTimePeriodChange(selectedKey)}
          >
            <Nav.Item>
              <Nav.Link eventKey="long_term" className="selector-item">
                All time
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="medium_term" className="selector-item">
                Last 6 months
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="short_term" className="selector-item">
                Last month
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Row>
            <Col md={12} lg={{ span: 6, offset: 1 }}>
              <SongList
                artistSelection={this.state.artistSelection}
                songs={this.props[this.state.timeRange]}
              />
            </Col>
            <Col lg={5}>
              <ArtistChoice
                songs={this.props[this.state.timeRange]}
                changeArtist={this.handleArtistChange.bind(this)}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = { fetchTopSongs };

const mapStateToProps = state => {
  return {
    long_term: state.topSongs.longTerm,
    medium_term: state.topSongs.mediumTerm,
    short_term: state.topSongs.shortTerm
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  requireAuth
)(TopSongs);
