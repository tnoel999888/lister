import React, { useState } from 'react';
import './App.css';
import { Masthead, Navigation, Main } from './components';

import moviesFile from './data/movie-ratings.csv';
import tvShowsFile from './data/tv-ratings.csv';
import booksFile from './data/book-ratings.csv';
import restaurantsFile from './data/restaurant-ratings.csv';

function App() {
  
  const [file, setFile] = useState(moviesFile);

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

  return (
    <div className="App">
      <Masthead />
      <Navigation onTabChange={onTabChange} />
      <Main ratingsFile={file} />
    </div>
  );
}

export default App;
