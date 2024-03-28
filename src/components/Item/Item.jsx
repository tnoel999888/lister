import React, { useState } from 'react';
import { block } from 'bem-cn';
import { makeStyles } from '@material-ui/core/styles';
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

  const useStyles = makeStyles({
    root: {
      maxWidth: 310,
      transition: "transform 0.15s ease-in-out"
    },
    cardHovered: {
      transform: "scale3d(1.05, 1.05, 1)"
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: "400px",
      margin: "auto",
    },
    paper: {
      backgroundColor: "white",
      padding: "0 24px",
      border: '1px solid #000',
      boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    },
  });
  const classes = useStyles();

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

  return (
    <div className={blk()}>
      <Card 
        className={classes.root}
        style={{
          backgroundColor: ratingsColours[rating],
          color: "#ffffff",
          maxWidth: "fit-content"
        }}
        classes={{ root: state.raised ? classes.cardHovered : "" }}
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
            <span className={blk("rating")}>{ Math.round(rating/10*2)/2 }/10</span>
            <span className={blk("emoji")}>{ getRatingInfo(rating).emoji }</span>
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
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={blk("modal-header")}>
              <span className={blk("modal-title")}>
                <h3>{name} - { Math.round(rating/10*2)/2 }/10 { getRatingInfo(rating).emoji }</h3>
              </span>
              <span className={blk("modal-close")}>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </span>
            </div>
            <p>{review}</p>
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
