import React, { useState, useEffect } from 'react';
import { Item } from "../Item"
import { Controls } from "../Controls"
import { block } from 'bem-cn';
import Papa from "papaparse";
import './main.scss';

const CSS_BLOCK_NAME = 'main';
const blk = block(CSS_BLOCK_NAME);

function Main({ ratingsFile }) {

  const [currentData, setCurrentData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const papaConfig = {
    skipEmptyLines: true,
    download: true,
    complete: (results) => {
      results.data.shift(); // remove header line
      const reversedData = [...results.data].reverse();
      setOriginalData(reversedData);
      setCurrentData(reversedData);
    },
    error: (error, file) => {
      console.log('Error while parsing:', error, file);
    },
  };

  // Parse file on component load
  useEffect(() => {
    Papa.parse(ratingsFile, papaConfig);
  }, [ratingsFile]);
    
  return (
    <div className={blk()}>
      <Controls 
        originalData={originalData}
        setCurrentData={setCurrentData}
      />

      {currentData.map(([name, rating, review]) => (
        <Item 
          key={name}
          name={name}
          rating={rating}
          review={review}
        />
      ))}
    </div>
  );
}

export default Main;
