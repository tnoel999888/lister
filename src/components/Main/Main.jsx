import React, { useEffect } from 'react';
import { Items } from "../Items";
import { Controls } from "../Controls";
import CircularProgress from '@material-ui/core/CircularProgress';
import { block } from 'bem-cn';
import { getRatingInfo } from '../consts';
import Divider from '@material-ui/core/Divider';
import PropTypes from "prop-types";
import Papa from "papaparse";

import { connect } from "react-redux";
import { setCurrentData, setOriginalData, setHistogramData } from "../../reducers/rootReducer";

import './main.scss';

const CSS_BLOCK_NAME = 'main';
const blk = block(CSS_BLOCK_NAME);

function Main({ ratingsFile, setCurrentData, originalData, setOriginalData, setHistogramData }) {

  let dataLoaded = false;

  if (originalData.length) {
    dataLoaded = true;
  }

  useEffect(() => {
    Papa.parse(
      ratingsFile, 
      {
        skipEmptyLines: true,
        download: true,
        complete: (results) => {
          // Remove header line
          results.data.shift();

          // Reverse chronological order default
          const reversedData = [...results.data].reverse(); 
          const histogramData = [];

          // Add rank number and index to each data entry
          reversedData.map((data, index) => {
            const rating = data[1];

            // Add to histogram array, ceil used to create bucket size of 1
            histogramData.push(Math.ceil(rating / 10));

            const ratingInfo = getRatingInfo(rating);
            data.push(ratingInfo.rank);
            return data.push(index);
          });

          setHistogramData(histogramData);
          setOriginalData(reversedData);
          setCurrentData(reversedData);
        },
        error: (error, file) => {
          console.log('Error while parsing:', error, file);
        },
      }
    );
  }, [ratingsFile, setCurrentData, setOriginalData, setHistogramData]);

  return (
    <div className={blk()}>
      { dataLoaded ?
        <div className={blk("content")}>
          <Controls />
          <Divider className="main-divider" />
          <Items />
        </div>
        : 
        <div className={blk("loading-spinner")}>
          <CircularProgress size={80} style={{ margin: "auto", color: "#1F96F3" }}/>
        </div>
      }
    </div>
  );
}

Main.propTypes = {
  ratingsFile: PropTypes.string.isRequired,
  setCurrentData: PropTypes.func.isRequired,
  originalData: PropTypes.array.isRequired,
  setOriginalData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  originalData: state.originalData, 
});

const mapDispatchToProps = {
  setOriginalData,
  setCurrentData,
  setHistogramData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
