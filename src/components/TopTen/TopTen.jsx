import React from 'react';
import { Item } from "../Item"
import { block } from 'bem-cn';
import PropTypes from "prop-types";

import './topTen.scss';

const CSS_BLOCK_NAME = 'topTen';
const blk = block(CSS_BLOCK_NAME);

// THIS COMPONENT IS CURRENTLY UNUSED
function TopTen({ originalData }) {

  const getTopTen = () => {
    return [...originalData].sort((a,b) => a[1].localeCompare(b[1])).reverse().slice(0, 10);
  }

  return (
    <div className={blk()}>
      <div className={blk("label")}>
        <span>Top 10:</span>
      </div>
      <div className={blk("items")}>
        { getTopTen().map(([name, rating, review, date, rank, index]) => (
          <Item 
            key={name}
            name={name}
            rating={rating}
            review={review}
          />
        )) }
      </div>
    </div>
  );
}

TopTen.propTypes = {
  originalData: PropTypes.array.isRequired,
};

export default TopTen;
