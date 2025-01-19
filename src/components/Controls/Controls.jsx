import React from 'react';
import { Search } from "../Search";
import { Sort } from "../Sort";
import { Stats } from "../Stats";
import { Filters } from "../Filters";
import { block } from 'bem-cn';
import Divider from '@mui/material/Divider';

import './controls.scss';

const CSS_BLOCK_NAME = 'controls';
const blk = block(CSS_BLOCK_NAME);

function Controls() {
  return (
    <div className={blk()}>
      <div className={blk("container")}>
        <div className={blk("top-row")}>
          <Search />
          <Divider className="controls-vertical-divider-1" orientation='vertical' />
          <Sort />
          <Divider className="controls-vertical-divider-2" orientation='vertical' />
          <Stats />
          <Divider className="controls-vertical-divider-3" orientation='vertical' />
        </div>
        <Filters />
      </div>
    </div>
  );
}

export default Controls;
