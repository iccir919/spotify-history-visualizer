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
      },
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          title: (tooltipItem, data) => {
            return this.props.tracks[tooltipItem[0].index].track.name;
          },
          afterTitle: (tooltipItem, data) => {
            if (
              this.props.tracks[tooltipItem[0].index].track.artists.length === 1
            ) {
              return this.props.tracks[tooltipItem[0].index].track.artists[0]
                .name;
            } else {
              return this.props.tracks[tooltipItem[0].index].track.artists
                .map(artist => {
                  return artist.name;
                })
                .join(', ');
            }
          },
          label: toolTipItem => {
            return toolTipItem.value;
          },
          afterLabel: toolTipItem => {
            return toolTipItem.label;
          }
        }
      }
    };

    return (
      <div>
        <h2>Recently played by {this.state.audioFeatureKey}</h2>
        <h6>{featureDescriptions[this.state.audioFeatureKey]}</h6>
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

const featureDescriptions = {
  acousticness:
    'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.',
  danceability:
    'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.',
  energy:
    'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.',
  instrumentalness:
    'Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.',
  liveness:
    'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.',
  loudness:
    'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.',
  tempo:
    'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',
  valence:
    'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).'
};
