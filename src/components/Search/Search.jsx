import React from 'react';
import { block } from 'bem-cn';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from "prop-types";

import './search.scss';

const CSS_BLOCK_NAME = 'search';
const blk = block(CSS_BLOCK_NAME);

function Search({originalData, setCurrentData}) {

  const onSearch = event => {
    const inputStr = event.target.value;

    if (inputStr === "") {
      setCurrentData([...originalData]);
    } else {
      setCurrentData([...originalData].filter(data => data[0].toLowerCase().includes(inputStr)));
    }
  }

  return (
    <div className={blk()}>
      <Paper component="form" className={blk("root")}>
        <InputBase
          className={blk("input")}
          onChange={onSearch}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton type="submit" className={blk("iconButton")} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

Search.propTypes = {
  originalData: PropTypes.array.isRequired,
  setCurrentData: PropTypes.func.isRequired,
};

export default Search;
