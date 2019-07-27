import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';

class AudioFeaturesGraph extends React.Component {
  state = {
    audioFeatureKey: 'tempo'
  };

  handleFeatureChange = button => {
    this.setState({
      audioFeatureKey: button.currentTarget.value
    });
  };

  render() {
    if (this.props.audioFeatures.length === 0) return null;

    const data = {
      labels: this.props.tracks.map(track => new Date(track.played_at)),
      datasets: [
        {
          label: 'Graph of recently played by ' + this.state.audioFeatureKey,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 6,
          pointHitRadius: 10,
          data: this.props.tracks.map(({ track }) => {
            return this.props.audioFeatures.find(audioFeature => {
              return audioFeature.id === track.id;
            })[this.state.audioFeatureKey];
          })
        }
      ]
    };
    const options = {
      scales: {
        xAxes: [
          {
            type: 'time',
            distribution: 'series'
          }
        ]
      }
    };

    return (
      <div>
        <h2>Recently played by {this.state.audioFeatureKey}</h2>
        <Scatter options={options} data={data} />
        <div className="d-flex flex-column">
          <ButtonGroup size="md">
            <Button value={'tempo'} onClick={this.handleFeatureChange}>
              tempo
            </Button>
            <Button value={'danceability'} onClick={this.handleFeatureChange}>
              danceability
            </Button>
            <Button value={'energy'} onClick={this.handleFeatureChange}>
              energy
            </Button>
            <Button value={'valence'} onClick={this.handleFeatureChange}>
              valence
            </Button>
          </ButtonGroup>
          <ButtonGroup size="md">
            <Button value={'loudness'} onClick={this.handleFeatureChange}>
              loudness
            </Button>
            <Button value={'acousticness'} onClick={this.handleFeatureChange}>
              acousticness
            </Button>
            <Button
              value={'instrumentalness'}
              onClick={this.handleFeatureChange}
            >
              instrumentalness
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    tracks: state.recentlyPlayed.tracks,
    audioFeatures: state.audioFeatures.tracksDetailed
  };
};

export default connect(
  mapStateToProps,
  null
)(AudioFeaturesGraph);
