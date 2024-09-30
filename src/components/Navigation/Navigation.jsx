import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import { block } from 'bem-cn';
import PropTypes from "prop-types";
import './navigation.scss';
import logo from '../../assets/lister-logo-rectangle.jpg';

import moviesFile from '../../data/movie-ratings.csv';
import tvShowsFile from '../../data/tv-ratings.csv';
import booksFile from '../../data/book-ratings.csv';
import restaurantsFile from '../../data/restaurant-ratings.csv';

import { connect } from "react-redux";
import { setSelectedFilters } from "../../reducers/rootReducer";

const CSS_BLOCK_NAME = 'navigation';
const blk = block(CSS_BLOCK_NAME);

function Navigation({ setFile, setSelectedFilters }) {
  const [value, setValue] = useState(0);

  function handleChange(event, newValue) {
    setSelectedFilters({});
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
        <Toolbar>
          <div className={blk("logo-container")}>
            <img src={logo} className={blk("logo")} alt="Lister Logo" />
          </div>
        </Toolbar>

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

Navigation.propTypes = {
  setSelectedFilters: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setSelectedFilters,
};

export default connect(null, mapDispatchToProps)(Navigation);
