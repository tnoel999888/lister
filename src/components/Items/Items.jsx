import React, { useState, useEffect } from 'react';
import { block } from 'bem-cn';
import { Item } from "../Item"
import PropTypes from "prop-types";
import { getRatingInfo } from '../consts';

import './items.scss';

const CSS_BLOCK_NAME = 'items';
const blk = block(CSS_BLOCK_NAME);

function Items({ currentData }) {

  return (
    <div className={blk()}>
      {[...currentData].map(([name, rating, review]) => {
          return (
            <Item 
              key={name}
              name={name}
              rating={rating}
              review={review}
            />
          )
        }
      )}
    </div>
  );
}

Items.propTypes = {
  currentData: PropTypes.array.isRequired,
};

export default Items;
