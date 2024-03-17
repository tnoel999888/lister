import React from 'react';
import { Search } from "../Search";
import { Sort } from "../Sort";
import { block } from 'bem-cn';
import PropTypes from "prop-types";

import './controls.scss';

const CSS_BLOCK_NAME = 'controls';
const blk = block(CSS_BLOCK_NAME);

function Controls({originalData, setCurrentData}) {
  return (
    <div className={blk()}>
      <Search originalData={originalData} setCurrentData={setCurrentData} />
      <Sort originalData={originalData} setCurrentData={setCurrentData} />
    </div>
  );
}

Controls.propTypes = {
  originalData: PropTypes.array.isRequired,
  setCurrentData: PropTypes.func.isRequired,
};

export default Controls;
