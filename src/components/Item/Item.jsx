import React, { useState } from 'react';
import { block } from 'bem-cn';
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import RateReview from '@material-ui/icons/RateReview';
import { getRatingInfo, ratingsColours } from '../consts';
import IconButton  from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './item.scss';

const CSS_BLOCK_NAME = 'item';
const blk = block(CSS_BLOCK_NAME);

function Item({ name, rating, review }) {

  const [state, setState] = useState({
    raised: false,
    shadow: 1,
  })

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ratingInfo = getRatingInfo(rating);
  const ratingOutOfTen = Math.round(rating/10*2)/2;

  return (
    <div className={blk()}>
      <Card 
        className={blk("root") + state.raised ? blk("card-hovered") : "" }
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
          <span className={blk("title")}>
            { name }
          </span>
          <div>
            <span className={blk("rating")}>{ ratingOutOfTen }/10</span>
            <span className={blk("emoji")} title={ratingInfo.name}>{ ratingInfo.emoji }</span>
            { review !== "" ? 
              <span className={blk("review")}>
                <IconButton onClick={handleOpen}>
                  <RateReview />
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
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
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
