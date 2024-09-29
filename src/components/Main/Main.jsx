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
import { setCurrentData, setOriginalData } from "../../reducers/rootReducer";

import './main.scss';

const CSS_BLOCK_NAME = 'main';
const blk = block(CSS_BLOCK_NAME);

function Main({ ratingsFile, setCurrentData, originalData, setOriginalData }) {

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
      }
    );
  }, [ratingsFile, setCurrentData, setOriginalData]);

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
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
