import React from 'react';
import { Search } from "../Search";
import { Sort } from "../Sort";
import { Filters } from "../Filters";
import { block } from 'bem-cn';
import Divider from '@material-ui/core/Divider';
import PropTypes from "prop-types";

import './controls.scss';

const CSS_BLOCK_NAME = 'controls';
const blk = block(CSS_BLOCK_NAME);

function Controls({ originalData, currentData, setCurrentData }) {
  return (
    <div className={blk()}>
      <Search originalData={originalData} setCurrentData={setCurrentData} />
      <Filters originalData={originalData} setCurrentData={setCurrentData} />
      <Sort currentData={currentData} setCurrentData={setCurrentData} />
      <Divider style={{ margin: "12px 0px 8px 0px" }} />
    </div>
  );
}

Controls.propTypes = {
  originalData: PropTypes.array.isRequired,
  currentData: PropTypes.array.isRequired,
  setCurrentData: PropTypes.func.isRequired,
};

export default Controls;
