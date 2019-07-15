import React from 'react';

import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Image
} from 'react-bootstrap';

import moment from 'moment';

const RecentList = props => {
  if (props.tracks.length === 0) {
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
        {props.tracks.map((song, key) => {
          return (
            <ListGroup.Item>
              <Container>
                <Row className="justify-content-sm-center">
                  <Col sm="auto">
                    <Image
                      className="thumbnail"
                      src={song.track.album.images[2].url}
                    />
                  </Col>
                  <Col sm="auto">
                    <h6 className="font-weight-bold">
                      {moment(song.played_at).format('LLL')}
                    </h6>
                    <h6 className="align-items-center">{song.track.name}</h6>
                    <p>{song.track.artists[0].name}</p>
                  </Col>
                </Row>
              </Container>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
};

export default RecentList;
