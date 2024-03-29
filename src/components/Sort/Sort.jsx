import React, { useState } from 'react';
import PropTypes from "prop-types";
import { block } from 'bem-cn';
import Icon from '@mdi/react';
import { mdiSortCalendarAscending, mdiSortCalendarDescending, mdiSortAlphabeticalAscendingVariant, mdiFilterVariant  } from '@mdi/js';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import './sort.scss';

const CSS_BLOCK_NAME = 'sort';
const blk = block(CSS_BLOCK_NAME);

function Sort({ currentData, setCurrentData }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const SORT_MODES = {
    reverseChronological: {
      id: "reverseChronological",
      label: "New → Old",
      handler: () => {
        setCurrentData([...currentData].sort(([,,,,index1],[,,,,index2]) => index1 - index2));
        setValue(SORT_MODES.reverseChronological);
        handleClose();
      },
      icon: <Icon path={mdiSortCalendarAscending} size={1} />
    },
    chronological: {
      id: "chronological",
      label: "Old → New",
      handler: () => {
        setCurrentData([...currentData].sort(([,,,,index1],[,,,,index2]) => index2 - index1));
        setValue(SORT_MODES.chronological);
        handleClose();
      },
      icon: <Icon path={mdiSortCalendarDescending} size={1} />
    },
    alphabetical: {
      id: "alphabetical",
      label: "Alphabetical",
      handler: () => {
        setCurrentData([...currentData].sort());
        setValue(SORT_MODES.alphabetical);
        handleClose();
      },
      icon: <Icon path={mdiSortAlphabeticalAscendingVariant} size={1} />
    },
    ratingsGrouped: {
      id: "ratingsGrouped",
      label: "Ranked",
      handler: () => {
        setCurrentData([...currentData].sort((a,b) => a[1].localeCompare(b[1])).reverse());
        setValue(SORT_MODES.ratingsGrouped);
        handleClose();
      },
      icon: <Icon path={mdiFilterVariant} size={1} />
    },
  }
  
  const [value, setValue] = useState(SORT_MODES.reverseChronological);

  return (
    <div className={blk()}>
      <div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          style={{ height: "36px", width: "201px" }}
          onClick={handleClick}
        >
          <span className={blk("menu-content")}>
            <span className={blk("menu-icon")}>{ value.icon }</span>
            <span className={blk("menu-label")}>{ value.label }</span>
          </span>
          <ArrowDropDownIcon />
        </Button>

        <Menu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          { Object.values(SORT_MODES).map((mode, index) => (
            <div key={index}>
              <MenuItem onClick={mode.handler}>
                <span className={blk("menu-item-icon")}>{mode.icon}</span>
                <ListItemText primary={mode.label} />
              </MenuItem >
            </div>
          ))}
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
