import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Nav,
  Row,
  Col,
  ListGroup,
  Image,
  Spinner
} from 'react-bootstrap';
import { compose } from 'redux';

import { fetchTopArtists } from '../../actions/topArtists';
import Header from '../../components/Header';
import GenreList from '../../components/GenreList';
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

  renderList() {
    if (this.props[this.state.timeRange].length === 0) {
      return (
        <div className="d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    } else {
      return (
        <ListGroup variant="flush">
          {this.props[this.state.timeRange].map((artist, key) => {
            if (
              this.state.genreSelection !== 'all genres' &&
              !artist.genres.includes(this.state.genreSelection)
            ) {
              return null;
            }

            return (
              <ListGroup.Item>
                <Container>
                  <Row>
                    <Col md={2} xs={1}>
                      <h5 className="font-weight-bold">{key + 1}</h5>
                    </Col>
                    <Col>
                      <Image className="thumbnail" src={artist.images[2].url} />
                    </Col>
                    <Col xs={7}>
                      <h6 className="align-items-center">{artist.name}</h6>
                    </Col>
                  </Row>
                </Container>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      );
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
            <Col xs={12} md={{ span: 6, offset: 1 }}>
              {this.renderList()}
            </Col>
            <Col md={5}>
              <GenreList
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
