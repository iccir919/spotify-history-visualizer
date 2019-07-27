import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

let data = {
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(30, 50, 100, 0.2)',
      borderColor: 'rgba(30, 50, 100, 1)',
      borderWidth: 1,
      data: null
    }
  ]
};

let options = {
  scales: {
    xAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    ]
  },
  legend: {
    display: false
  },
  tooltips: { enabled: false },
  hover: { mode: null }
};

const PopularityChart = props => {
  const avgPopularity =
    props.list.reduce((accum, item) => {
      return accum + item.popularity;
    }, 0) / props.list.length;
  data.datasets[0].data = [avgPopularity];
  return (
    <div>
      <h2>Average {props.type} Popularity</h2>
      <HorizontalBar options={options} data={data} />
    </div>
  );
};

export default PopularityChart;
