import React, { useState, useEffect } from 'react';
import { Items } from "../Items";
import { Controls } from "../Controls";
import { TopTen } from "../TopTen";
import CircularProgress from '@material-ui/core/CircularProgress';
import { block } from 'bem-cn';
import { getRatingInfo } from '../consts';
import Papa from "papaparse";

import './main.scss';

const CSS_BLOCK_NAME = 'main';
const blk = block(CSS_BLOCK_NAME);

function Main({ ratingsFile }) {

  const [currentData, setCurrentData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  let dataLoaded = false;

  if (currentData.length) {
    dataLoaded = true;
  }

  const papaConfig = {
    skipEmptyLines: true,
    download: true,
    complete: (results) => {
      results.data.shift(); // remove header line
      const reversedData = [...results.data].reverse(); // reverse chronological order
      reversedData.map((data, index) => {
        const rating = data[1];
        const ratingInfo = getRatingInfo(rating);
        data.push(ratingInfo.rank);
        return data.push(index);
      });
      setOriginalData(reversedData);
      setCurrentData(reversedData);
    },
    error: (error, file) => {
      console.log('Error while parsing:', error, file);
    },
  };

  useEffect(() => {
    Papa.parse(ratingsFile, papaConfig);
  }, [ratingsFile, papaConfig]);

  return (
    <div className={blk()}>
      { dataLoaded ?
        <div className={blk("content")}>
          <TopTen originalData={originalData} />
          <Controls 
            originalData={originalData}
            currentData={currentData}
            setCurrentData={setCurrentData}
          />
          <Items currentData={currentData} />
        </div>
        : <CircularProgress size={80} style={{ margin: "auto", color: "#1F96F3" }}/>
      }
    </div>
  );
}

export default Main;
