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

import './stats.scss';

const CSS_BLOCK_NAME = 'stats';
const blk = block(CSS_BLOCK_NAME);

function Stats({ ratingsHistogramData, datesHistogramData }) {

  const [open, setOpen] = useState(false);
  const [ratingsSelected, setRatingsSelected] = useState(true);
  const [datesSelected, setDatesSelected] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const totalRatings = ratingsHistogramData.reduce((partialSum, a) => partialSum + a, 0);
  const numRatings = ratingsHistogramData.length;
  const averageRating = totalRatings/numRatings;
  const averageRatingRounded = Math.round(averageRating * 10) / 10

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

  const plotlyDefaults = {
      layout: {
          margin: {'t': 30,'l': 70,'b': 50,'r': 30 },
          bargap: 0.01,
          autosize: true
      },
      config: {
          responsive: true,
          displayModeBar: false
      },
      style: {
          width: "100%",
          height: "100%"
      }
  };

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

  const datesClicked = () => {
      if(!datesSelected) {
        setDatesSelected(true);
        setRatingsSelected(false);
      }
  }

  const ratingsClicked = () => {
      if(!ratingsSelected) {
        setRatingsSelected(true);
        setDatesSelected(false);
      }
  }

  return (
    <div className={blk()}>
        <span className={blk("label")}>Stats:</span>

        <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="outlined"
            className="stats-btn"
            onClick={handleOpen}
            style={{ maxWidth: '55px', minWidth: '55px' }}
        >
            <Icon path={mdiChartBar} size={1} />
        </Button>

        <Modal
            className={blk("modal")}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={blk("paper")}>
                    <div className={blk("modal-header")}>
                        <h3 className={blk("modal-title")}>Stats</h3>
                        <span className={blk("modal-close")}>
                        <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton>
                        </span>
                    </div>

                    <div className={blk("button-group")}>
                        <ButtonGroup
                            variant="outlined"
                            color="primary"
                            aria-label="text primary button group"
                        >
                          <Button
                              size='small'
                              onClick={ratingsClicked}
                              style={{
                                  backgroundColor: ratingsSelected ? "#1F96F3" : "inherit",
                                  color: ratingsSelected ? "white" : "#4f4e4e",
                              }}
                          >
                            Ratings
                          </Button>
                          <Button
                              size='small'
                              onClick={datesClicked}
                              style={{
                                  backgroundColor: datesSelected ? "#1F96F3" : "inherit",
                                  color: datesSelected ? "white" : "#4f4e4e",
                              }}
                          >
                            Years
                          </Button>
                        </ButtonGroup>
                    </div>

                    { ratingsSelected ?
                        <div>
                            <div className={blk("graph")}>
                                <Plot
                                    data={ratingsAvgGraph.data}
                                    layout={ratingsAvgGraph.layout}
                                    config={ratingsAvgGraph.config}
                                    style={ratingsAvgGraph.style}
                                    useResizeHandler={true}
                                />
                            </div>
                            <span>Average: {averageRatingRounded}</span>
                        </div>
                        : null
                    }

                    { datesSelected ?
                        <div>
                            <div className={blk("graph")}>
                                <Plot
                                    title="Per Year"
                                    data={datesGraph.data}
                                    layout={datesGraph.layout}
                                    config={datesGraph.config}
                                    style={datesGraph.style}
                                    useResizeHandler={true}
                                />
                            </div>
                            <span>Average: {averagePerYearRounded}</span>
                        </div>
                        : null
                    }
                </div>
            </Fade>
        </Modal>
    </div>
  );
}

Stats.propTypes = {
    ratingsHistogramData: PropTypes.array.isRequired,
    datesHistogramData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  ratingsHistogramData: state.ratingsHistogramData,
  datesHistogramData: state.datesHistogramData,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
