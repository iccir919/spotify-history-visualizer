import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const ArtistChoice = props => {
  const artistList = {};
  props.songs.forEach(song => {
    song.artists.forEach(artist => {
      if (artistList[artist.name]) {
        artistList[artist.name] += 1;
      } else {
        artistList[artist.name] = 1;
      }
    });
  });
  const artists = [];

  for (let genre in artistList) {
    artists.push(genre);
  }
  const buttonGroups = [[]];

  for (let i = 0; i < Math.ceil(artists.length / 2); i++) {
    const buttons = [];
    for (let j = 0; j < 2; j++) {
      buttons.push(artists[i * 2 + j]);
    }
    buttonGroups.push(buttons);
  }

  return (
    <div>
      <h3>Browse by Artist</h3>
      <div>
        <Button
          onClick={props.changeArtist}
          value={'all artists'}
          className="mr-3 mb-3"
        >
          all artists
        </Button>
        {buttonGroups.map(buttons => {
          return (
            <ButtonGroup>
              {buttons.map(genre => {
                if (genre)
                  return (
                    <Button
                      onClick={props.changeArtist}
                      value={genre}
                      className="mr-3 mb-3 "
                    >
                      {genre}
                    </Button>
                  );
              })}
            </ButtonGroup>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistChoice;
