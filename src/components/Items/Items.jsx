import React, { useState, useEffect } from 'react';
import { block } from 'bem-cn';
import { Item } from "../Item"
import PropTypes from "prop-types";
import { getRatingInfo } from '../consts';

import './items.scss';

const CSS_BLOCK_NAME = 'items';
const blk = block(CSS_BLOCK_NAME);

function Items({ currentData, filters }) {

  return (
    <div className={blk()}>
      {[...currentData].map(([name, rating, review]) => {
        const ratingsInfo = getRatingInfo(rating);
        const noFilters = filters && Object.values(filters).length && !Object.values(filters).includes(true);
        console.log(Object.values(filters));
        console.log(Object.values(filters).includes(true));
        if ((filters && filters[ratingsInfo.rank]) || noFilters) {
          return (
            <Item 
              key={name}
              name={name}
              rating={rating}
              review={review}
            />
          )
        } else {
          return null;
        }}
      )}
    </div>
  );
}

Items.propTypes = {
  currentData: PropTypes.array.isRequired,
};

export default Items;
