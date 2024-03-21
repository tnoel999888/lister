import React, { useState, useEffect } from 'react';
import { Items } from "../Items"
import { Controls } from "../Controls"
import { TopTen } from "../TopTen"
import { block } from 'bem-cn';
import Papa from "papaparse";

import './main.scss';

const CSS_BLOCK_NAME = 'main';
const blk = block(CSS_BLOCK_NAME);

function Main({ ratingsFile }) {

  const [filters, setFilters] = useState({});
  const [currentData, setCurrentData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const papaConfig = {
    skipEmptyLines: true,
    download: true,
    complete: (results) => {
      results.data.shift(); // remove header line
      const reversedData = [...results.data].reverse(); // reverse chronological order
      setOriginalData(reversedData);
      setCurrentData(reversedData);
    },
    error: (error, file) => {
      console.log('Error while parsing:', error, file);
    },
  };

  useEffect(() => {
    Papa.parse(ratingsFile, papaConfig);
  }, [ratingsFile]);
    
  return (
    <div className={blk()}>
      <TopTen originalData={originalData} />
      <Controls 
        originalData={originalData}
        setCurrentData={setCurrentData}
        setFilters={setFilters}
      />
      <Items currentData={currentData} filters={{...filters}} />
    </div>
  );
}

export default Main;