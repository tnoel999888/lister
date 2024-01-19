import React, { Component } from 'react';
import './App.css';
import { Masthead, Navigation } from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Masthead />
        <Navigation />
      </div>
    );
  }
}

export default App;
