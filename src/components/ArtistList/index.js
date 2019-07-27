import React from 'react';

import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Image
} from 'react-bootstrap';

const ArtistList = props => {
  if (props.artists.length === 0) {
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
        {props.artists.map((artist, key) => {
          if (
            props.genreSelection !== 'all genres' &&
            !artist.genres.includes(props.genreSelection)
          ) {
            return null;
          }

          return (
            <ListGroup.Item>
              <Container>
                <Row>
                  <Col md={2} xs={1}>
                    <h4 className="font-weight-bold">{key + 1}</h4>
                  </Col>
                  <Col>
                    <Image className="thumbnail" src={artist.images[2].url} />
                  </Col>
                  <Col xs={7}>
                    <h5 className="align-items-center">{artist.name}</h5>
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

export default ArtistList;
