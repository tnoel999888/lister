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
      <div className={blk("container")}>
        <div className={blk("top-row")}>
          <Search originalData={originalData} setCurrentData={setCurrentData} />
          <Divider className="controls-vertical-divider-1" orientation='vertical' />
          <Sort currentData={currentData} setCurrentData={setCurrentData} />
          <Divider className="controls-vertical-divider-2" orientation='vertical' />
        </div>
        <Filters originalData={originalData} setCurrentData={setCurrentData} />
      </div>
      <Divider style={{ margin: "16px 0px", height: "2px" }} />
    </div>
  );
}

Controls.propTypes = {
  originalData: PropTypes.array.isRequired,
  currentData: PropTypes.array.isRequired,
  setCurrentData: PropTypes.func.isRequired,
};

export default Controls;
