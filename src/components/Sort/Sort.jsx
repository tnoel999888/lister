import React, { useState } from 'react';
import PropTypes from "prop-types";
import { block } from 'bem-cn';
import Icon from '@mdi/react';
import { mdiSortCalendarAscending, mdiSortCalendarDescending, mdiSortAlphabeticalAscendingVariant, mdiFilterVariant  } from '@mdi/js';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import './sort.scss';

const CSS_BLOCK_NAME = 'sort';
const blk = block(CSS_BLOCK_NAME);

function Sort({ currentData, setCurrentData }) {
  const SORT_MODES = {
    reverseChronological: {
      id: "reverseChronological",
      label: "Reverse Chronological"
    },
    chronological: {
      id: "chronological",
      label: "Chronological"
    },
    alphabetical: {
      id: "alphabetical",
      label: "Alphabetical"
    },
    ratingsGrouped: {
      id: "ratingsGrouped",
      label: "Ratings Grouped"
    },
  }

  const [value, setValue] = useState(SORT_MODES.reverseChronological);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onReverseChronological = () => {
    setCurrentData([...currentData].sort(([,,,,index1],[,,,,index2]) => index1 - index2));
    setValue(SORT_MODES.reverseChronological);
    handleClose();
  }

  const onChronological = () => {
    setCurrentData([...currentData].sort(([,,,,index1],[,,,,index2]) => index2 - index1));
    setValue(SORT_MODES.chronological);
    handleClose();
  }

  const onAlphabetical = () => {
    setCurrentData([...currentData].sort());
    setValue(SORT_MODES.alphabetical);
    handleClose();
  }

  const onRatingsGrouped = () => {
    setCurrentData([...currentData].sort((a,b) => a[1].localeCompare(b[1])).reverse());
    setValue(SORT_MODES.ratingsGrouped);
    handleClose();
  }
  
  return (
    <div className={blk()}>
      <div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          { value.label }
          <ArrowDropDownIcon />
        </Button>

        <Menu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={onReverseChronological}>
            <span className={blk("icon")}><Icon path={mdiSortCalendarAscending} size={1} /></span>
            <ListItemText primary="Reverse Chronological" />
          </MenuItem >
          <Divider />
          <MenuItem onClick={onChronological}>
            <span className={blk("icon")}><Icon path={mdiSortCalendarDescending} size={1} /></span>
            <ListItemText primary="Chronological" />
          </MenuItem >
          <Divider />
          <MenuItem onClick={onAlphabetical}>
            <span className={blk("icon")}><Icon path={mdiSortAlphabeticalAscendingVariant} size={1} /></span>
            <ListItemText primary="Alphabetical" />
          </MenuItem >
          <Divider />
          <MenuItem onClick={onRatingsGrouped}>
            <span className={blk("icon")}><Icon path={mdiFilterVariant} size={1} /></span>
            <ListItemText primary="Ranked" />
          </MenuItem >
        </Menu>
      </div>
    </div>
  );
}

Sort.propTypes = {
  currentData: PropTypes.array.isRequired,
  setCurrentData: PropTypes.func.isRequired,
};

export default Sort;
