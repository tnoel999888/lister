import React, { useState } from 'react';
import { block } from 'bem-cn';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RateReview from '@material-ui/icons/RateReview';
import { getRatingInfo, ratingsColours } from '../consts';
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
    }
  });
  const classes = useStyles();

  const [state, setState] = useState({
    raised: false,
    shadow: 1,
  })

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
              <span className={blk("review")} title={review}>
                <RateReview />
              </span> : null
            }
          </div>  
        </CardContent>
      </Card>
    </div>
  );
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
};

export default Item;
