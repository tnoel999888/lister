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

const CSS_BLOCK_NAME = 'years-graph';
const blk = block(CSS_BLOCK_NAME);

function YearsGraph({ datesHistogramData }) {

  const datesBuckets = {};
  datesHistogramData.forEach(date => {
    if (datesBuckets[date]) {
        datesBuckets[date]++;
    } else {
        datesBuckets[date] = 1
    }
  })
  const countPerYear = Object.values(datesBuckets);
  const totalAllYears = countPerYear.reduce((partialSum, a) => partialSum + a, 0);
  const numYears = countPerYear.length;
  const averagePerYear = totalAllYears/numYears;
  const averagePerYearRounded = Math.round(averagePerYear * 10) / 10

  const datesGraph = {
      data: [
          {
              x: datesHistogramData,
              type: 'histogram',
              marker: { color: "#1F96F3" }
          }
      ],
      layout: {
          title: {
              text: "Count Per Year"
          },
          xaxis: {
            title: {
              text: "Year",
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
            title="Per Year"
            data={datesGraph.data}
            layout={datesGraph.layout}
            config={datesGraph.config}
            style={datesGraph.style}
            useResizeHandler={true}
        />
        <span>Average: {averagePerYearRounded}</span>
    </div>
  );
}

YearsGraph.propTypes = {
    datesHistogramData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  datesHistogramData: state.datesHistogramData,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(YearsGraph);
