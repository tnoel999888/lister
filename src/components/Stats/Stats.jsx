import React, { useState } from 'react';
import { block } from 'bem-cn';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Plot from 'react-plotly.js';
import Icon from '@mdi/react';
import IconButton  from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import { mdiChartBar } from '@mdi/js';

import './stats.scss';

const CSS_BLOCK_NAME = 'stats';
const blk = block(CSS_BLOCK_NAME);

function Stats({ histogramData }) {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const plotlyState = {
    data: [
        { 
            x: histogramData, 
            type: 'histogram', 
            marker: { color: "#1F96F3" }
        }
    ], 
    layout: { 
        margin: {'t': 30,'l': 50,'b': 50,'r': 50 }, 
        bargap: 0.01, 
        xaxis: { "dtick": 1 },
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
                            <CloseIcon />
                        </IconButton>
                        </span>
                    </div>
                    <div>
                        <Plot
                            data={plotlyState.data}
                            layout={plotlyState.layout}
                            config={plotlyState.config}
                            style={plotlyState.style}
                            useResizeHandler={true}
                        />
                    </div>
                </div>
            </Fade>
        </Modal>
    </div>
  );
}

Stats.propTypes = {
    histogramData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  histogramData: state.histogramData, 
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
