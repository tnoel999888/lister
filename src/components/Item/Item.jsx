import React from 'react';
import { block } from 'bem-cn';
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RateReview from '@material-ui/icons/RateReview';
import { getRatingEmoji, ratingsColours } from '../consts';
import './item.scss';

const CSS_BLOCK_NAME = 'item';
const blk = block(CSS_BLOCK_NAME);

function Item({name, rating, review}) {
  return (
    <div className={blk()}>
      <Card className={blk("card")} style={{backgroundColor: ratingsColours[rating], color: "#ffffff" }}>
        <CardContent>
          <span className={blk("title")}>
            { name }
          </span>
          <div>
            <span className={blk("rating")}>{ rating/10 }/10</span>
            <span className={blk("emoji")}>{ getRatingEmoji(rating) }</span>
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
