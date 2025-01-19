import React, { useState } from 'react';
import { block } from 'bem-cn';
import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { getRatingInfo, ratingsColours } from '../consts';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import './item.scss';

const CSS_BLOCK_NAME = 'item';
const blk = block(CSS_BLOCK_NAME);

function Item({ index, name, rating, review }) {

  const [state, setState] = useState({
    raised: false,
    shadow: 1,
  })

  const [open, setOpen] = useState(false);

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
    transform: 'translate(-50%, -50%)',
  };

  const ratingInfo = getRatingInfo(rating);
  const ratingOutOfTen = Math.round(rating/10*2)/2;
  const raisedClass = state.raised ? (" " + blk("card-hovered")) : "";

  return (
    <div className={blk()}>
      <Card 
        className={blk("root") + raisedClass }
        style={{
          backgroundColor: ratingsColours[rating],
          color: "#ffffff",
          maxWidth: "fit-content"
        }}
        onMouseOver={() => setState({ raised: true, shadow: 3 })}
        onMouseOut={() => setState({ raised: false, shadow: 1 })} 
        raised={state.raised} 
        zdepth={state.shadow}
      >
        <CardContent>
          <div>
            <span className={blk("title")}>{ name }</span>
            <span className={blk("index")}>#{ index }</span>
          </div>
          <div>
            <span className={blk("rating")}>{ ratingOutOfTen }/10</span>
            <span className={blk("emoji")} title={ratingInfo.name}>{ ratingInfo.emoji }</span>
            { review !== "" ? 
              <span className={blk("review")}>
                <IconButton onClick={handleOpen}>
                  <RateReviewIcon />
                </IconButton >
              </span> : null
            }
          </div>  
        </CardContent>
      </Card>

      { review ?
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
                <h3 className={blk("modal-title")}>{name} - { ratingOutOfTen }/10 { ratingInfo.emoji }</h3>
                <span className={blk("modal-close")}>
                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </span>
              </div>
              <p className={blk("modal-review")}>{review}</p>
            </div>
          </Box>
        </Fade>
      </Modal>
      : null
      }
    </div>
  );
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
};

export default Item;
