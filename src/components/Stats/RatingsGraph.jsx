import React, { useState } from 'react';
import { block } from 'bem-cn';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Plot from 'react-plotly.js';
import Icon from '@mdi/react';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Close from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { mdiChartBar } from '@mdi/js';
import { plotlyDefaults } from "./consts";

const CSS_BLOCK_NAME = 'ratings-graph';
const blk = block(CSS_BLOCK_NAME);

function RatingsGraph({ ratingsHistogramData }) {

  const totalRatings = ratingsHistogramData.reduce((partialSum, a) => partialSum + a, 0);
  const numRatings = ratingsHistogramData.length;
  const averageRating = totalRatings/numRatings;
  const averageRatingRounded = Math.round(averageRating * 10) / 10

  const ratingsAvgGraph = {
    data: [
        {
            x: ratingsHistogramData,
            type: 'histogram',
            marker: { color: "#1F96F3" }
        }
    ],
    layout: {
        title: {
            text: "Count Per Rating"
        },
        xaxis: {
          title: {
            text: "Rating",
          },
          dtick: 1
        },
        yaxis: {
          title: {
            text: "Count",
          },
        },
        ...plotlyDefaults.layout,
    },
    config: plotlyDefaults.config,
    style: plotlyDefaults.style,
  };

  return (
    <div className={blk("graph")}>
        <Plot
            data={ratingsAvgGraph.data}
            layout={ratingsAvgGraph.layout}
            config={ratingsAvgGraph.config}
            style={ratingsAvgGraph.style}
            useResizeHandler={true}
        />
        <span>Average: {averageRatingRounded}</span>
    </div>
  );
}

RatingsGraph.propTypes = {
    ratingsHistogramData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  ratingsHistogramData: state.ratingsHistogramData,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingsGraph);
