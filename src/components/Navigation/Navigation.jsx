import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { block } from 'bem-cn';
import './navigation.scss';

import moviesFile from '../../data/movie-ratings.csv';
import tvShowsFile from '../../data/tv-ratings.csv';
import booksFile from '../../data/book-ratings.csv';
import restaurantsFile from '../../data/restaurant-ratings.csv';

const CSS_BLOCK_NAME = 'navigation';
const blk = block(CSS_BLOCK_NAME);

function Navigation({ setFile }) {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
    onTabChange(newValue)
  }

  const onTabChange = (value) => {
    if (value === 0) {
      setFile(moviesFile);
    }
    if (value === 1) {
      setFile(tvShowsFile);
    }
    if (value === 2) {
      setFile(booksFile);
    }
    if (value === 3) {
      setFile(restaurantsFile);
    }
  }

  useEffect(() => {
    onTabChange(0);
  }, []);

  return (
    <div className={blk()}>
      <AppBar position="static">
        <Tabs 
          value={value} 
          onChange={handleChange} 
          centered
        >
          <Tab label="Films" />
          <Tab label="TV Shows" />
          <Tab label="Books" />
          <Tab label="Restaurants" />
        </Tabs>
      </AppBar>
    </div>
  );
}

export default Navigation;
