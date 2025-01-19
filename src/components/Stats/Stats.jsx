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
import Box from '@mui/material/Box';
import { RatingsGraph } from "../Stats";
import { YearsGraph } from "../Stats";
import { mdiChartBar } from '@mdi/js';

import './stats.scss';

const CSS_BLOCK_NAME = 'stats';
const blk = block(CSS_BLOCK_NAME);

function Stats({ }) {

  const [open, setOpen] = useState(false);
  const [ratingsSelected, setRatingsSelected] = useState(true);
  const [datesSelected, setDatesSelected] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxWidth: "90%",
    transform: 'translate(-50%, -50%)',
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
        >
            <Fade in={open}>
                <Box sx={style}>
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
                            <RatingsGraph />
                            : null
                        }

                        { datesSelected ?
                            <YearsGraph />
                            : null
                        }
                    </div>
                </Box>
            </Fade>
        </Modal>
    </div>
  );
}

Stats.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
