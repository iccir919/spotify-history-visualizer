import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const GenreList = props => {
  const genreList = {};
  props.artists.forEach(artist => {
    artist.genres.forEach(genre => {
      if (genreList[genre]) {
        genreList[genre] += 1;
      } else {
        genreList[genre] = 1;
      }
    });
  });
  const mostPopularGenres = [];

  for (let genre in genreList) {
    if (genreList[genre] > 2) {
      mostPopularGenres.push(genre);
    }
  }
  const buttonGroups = [[]];

  for (let i = 0; i < Math.ceil(mostPopularGenres.length / 2); i++) {
    const buttons = [];
    for (let j = 0; j < 2; j++) {
      buttons.push(mostPopularGenres[i * 2 + j]);
    }
    buttonGroups.push(buttons);
  }

  return (
    <div>
      <h3>Genres</h3>
      <div>
        <Button
          onClick={props.changeGenre}
          value={'all genres'}
          className="mr-3 mb-3"
        >
          all genres
        </Button>
        {buttonGroups.map(buttons => {
          return (
            <ButtonGroup>
              {buttons.map(genre => {
                if (genre)
                  return (
                    <Button
                      onClick={props.changeGenre}
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

export default GenreList;
