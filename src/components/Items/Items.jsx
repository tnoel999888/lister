import React from 'react';
import { block } from 'bem-cn';
import { Item } from "../Item"
import PropTypes from "prop-types";

import { connect } from "react-redux";

import './items.scss';

const CSS_BLOCK_NAME = 'items';
const blk = block(CSS_BLOCK_NAME);

function Items({ currentData }) {
  return (
    <div className={blk()}>
      {currentData
        .map(([name, rating, review]) => {
            return (
              <Item 
                key={name}
                name={name}
                rating={rating}
                review={review}
              />
            )
          }
        )
      }
    </div>
  );
}

Items.propTypes = {
  currentData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  currentData: state.currentData, 
});

export default connect(mapStateToProps)(Items);
