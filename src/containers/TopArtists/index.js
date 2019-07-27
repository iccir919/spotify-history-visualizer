import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Nav, Row, Col } from 'react-bootstrap';
import { compose } from 'redux';

import { fetchTopArtists } from '../../actions/topArtists';
import Header from '../../components/Header';
import ArtistList from '../../components/ArtistList';
import GenreChoice from '../../components/GenreChoice';
import PopularityChart from '../../components/PopularityChart';
import requireAuth from '../../components/requireAuth';

import './TopArtists.css';

class TopArtists extends Component {
  state = {
    timeRange: 'long_term',
    genreSelection: 'all genres'
  };

  componentDidMount() {
    this.props.fetchTopArtists(this.state.timeRange);
  }

  handleGenreChange(genre) {
    let body = document.body; // For Safari
    let html = document.documentElement; // Chrome, Firefox, IE and Opera
    body.scrollTop = 0;
    html.scrollTop = 0;
    this.setState({
      genreSelection: genre.currentTarget.value
    });
  }

  handleTimePeriodChange(timeRange) {
    if (this.props[timeRange].length === 0) {
      this.props.fetchTopArtists(timeRange);
      this.setState({
        timeRange: timeRange,
        genreSelection: 'all genres'
      });
    } else {
      this.setState({
        timeRange: timeRange,
        genreSelection: 'all genres'
      });
    }
  }

  render() {
    return (
      <div className="top-artists-page">
        <Header />
        <h1 className="page-header">Top Artists</h1>
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
              <ArtistList
                genreSelection={this.state.genreSelection}
                artists={this.props[this.state.timeRange]}
              />
            </Col>
            <Col lg={5}>
              <GenreChoice
                changeGenre={this.handleGenreChange.bind(this)}
                artists={this.props[this.state.timeRange]}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = { fetchTopArtists };

const mapStateToProps = state => {
  return {
    long_term: state.topArtists.longTerm,
    medium_term: state.topArtists.mediumTerm,
    short_term: state.topArtists.shortTerm
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  requireAuth
)(TopArtists);
