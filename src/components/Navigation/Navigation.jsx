import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
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

  const TABS = {
      films: {
          name: "Films",
          file: moviesFile,
          path: "films",
          index: 0,
      },
      tv: {
          name: "TV Shows",
          file: tvShowsFile,
          path: "tv",
          index: 1,
      },
      books: {
          name: "Books",
          file: booksFile,
          path: "books",
          index: 2,
      },
      restaurants: {
          name: "Restaurants",
          file: restaurantsFile,
          path: "restaurants",
          index: 3,
      },
  }

  const onTabChange = (value) => {
    if (value === 0) {
      setFile(TABS.films.file);
    }
    if (value === 1) {
      setFile(TABS.tv.file);
    }
    if (value === 2) {
      setFile(TABS.books.file);
    }
    if (value === 3) {
      setFile(TABS.restaurants.file);
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
          indicatorColor="white"
          textColor="white"
          centered
        >
          <Tab label={TABS.films.name} />
          <Tab label={TABS.tv.name} />
          <Tab label={TABS.books.name} />
          <Tab label={TABS.restaurants.name} />
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
