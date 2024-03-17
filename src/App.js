import React, { Component } from 'react';
import './App.css';
import { Masthead, Navigation, Main } from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Masthead />
        <Navigation />
        <Main />
      </div>
    );
  }
}

export default App;
