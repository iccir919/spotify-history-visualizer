import React from 'react';

import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Image
} from 'react-bootstrap';

const SongList = props => {
  if (props.songs.length === 0) {
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
        {props.songs.map((song, key) => {
          let artists = song.artists.map(artist => artist.name);
          if (
            props.artistSelection !== 'all artists' &&
            !artists.includes(props.artistSelection)
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
                    <Image
                      className="thumbnail"
                      src={song.album.images[2].url}
                    />
                  </Col>
                  <Col xs={7}>
                    <h6 className="align-items-center">{song.name}</h6>
                    <p>{song.artists[0].name}</p>
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

export default SongList;
