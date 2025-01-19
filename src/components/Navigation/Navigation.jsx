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
      setUrlParam(TABS.films.path);
    }
    if (value === 1) {
      setFile(TABS.tv.file);
      setUrlParam(TABS.tv.path);
    }
    if (value === 2) {
      setFile(TABS.books.file);
      setUrlParam(TABS.books.path);
    }
    if (value === 3) {
      setFile(TABS.restaurants.file);
      setUrlParam(TABS.restaurants.path);
    }
  }

  const setUrlParam = (param) => {
      window.history.pushState('', '', '/lister/' + param);
  }

  useEffect(() => {
      // If URL is missing a page param or trailing slash at the end then add one so page loads correctly
      const urlParts = window.location.href.split('/');
      const lastPart = urlParts[urlParts.length - 1];
      if (lastPart === "lister") {
          window.location.href += '/';
      }

      const newLastPart = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
      if (!newLastPart) {
          // If there's no page param then default to the first tab (Films)
          handleChange(null, 0);
      } else {
          // If there is a page param then load that specific page
          const tab = TABS[lastPart];
          if (tab) {
              handleChange(null, tab.index);
          }
      }

  }, [onTabChange]);

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
