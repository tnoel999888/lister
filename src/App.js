import React, { useState } from 'react';
import './App.css';
import { Masthead, Navigation, Main } from './components';

function App() {
  const [file, setFile] = useState(null);

  return (
    <div className="App">
      <Masthead />
      <Navigation setFile={setFile} />
      { file !== null ? <Main ratingsFile={file} /> : null }
    </div>
  );
}

export default App;
