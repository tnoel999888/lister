import React from 'react';
import { block } from 'bem-cn';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from "prop-types";

import './search.scss';

const CSS_BLOCK_NAME = 'search';
const blk = block(CSS_BLOCK_NAME);

function Search({ originalData, setCurrentData }) {

  const onSearch = event => {
    const inputStr = event.target.value;

    if (inputStr === "") {
      setCurrentData([...originalData]);
    } else {
      setCurrentData([...originalData].filter(data => data[0].toLowerCase().includes(inputStr)));
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 300,
      height: 32,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

  const classes = useStyles();

  return (
    <div className={blk()}>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          onChange={onSearch}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton type="submit" aria-label="search" className={classes.iconButton} >
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
