import React, { useState, useEffect } from 'react';
import { block } from 'bem-cn';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PropTypes from "prop-types";
import { RATINGS_INFO, getRatingInfo } from '../consts';

import './filters.scss';

const CSS_BLOCK_NAME = 'filters';
const blk = block(CSS_BLOCK_NAME);

function Filters({ originalData, setCurrentData }) {

  const selectedBtnBackground = (selected) => selected ? "#1F96F3" : "white";
  const selectedBtnTextColor = (selected) => selected ? "white" : "";
  const ratings = {};
  const [selectedFilters, setSelectedFilters] = useState({});
  const [allBtnSelected, setAllBtnSelected] = useState(true);

  // Get count for each rating group
  originalData.forEach(([,rating,]) => {
    const ratingInfo = getRatingInfo(rating);
    if (ratings[ratingInfo.rank]) {
      ratings[ratingInfo.rank]++;
    } else  {
      ratings[ratingInfo.rank] = 1;
    }
  });

  // Set all btn as selected if no filters or all filters selected
  useEffect(() => {
    const filters = Object.values(selectedFilters);
    setAllBtnSelected(!filters.length || filters.length === Object.values(RATINGS_INFO).length);
  }, [selectedFilters]);

  useEffect(() => {
    if (allBtnSelected) {
      setCurrentData(originalData);
      setSelectedFilters({});
    }
  }, [allBtnSelected, originalData, setCurrentData]);

  const onAllBtnClick = () => {
    setSelectedFilters({});
    setCurrentData(originalData);
  }

  const onIndividualFilterBtnClick = (index) => {
    const selectedFiltersCopy = {...selectedFilters};
    if (selectedFiltersCopy[index] !== undefined) {
      delete selectedFiltersCopy[index];
    } else {
      selectedFiltersCopy[index] = true;
    }

    setSelectedFilters(selectedFiltersCopy);
    setCurrentData(originalData.filter(([,,,rank]) => selectedFiltersCopy[rank])); 
  }

  return (
    <div className={blk()}>
      {/* All button */}
      <Button
        color="primary" 
        variant="outlined"
        className="filters-btn"
        style={{ 
          backgroundColor: selectedBtnBackground(allBtnSelected), 
          color: selectedBtnTextColor(allBtnSelected), 
        }}
        onClick={onAllBtnClick}
      >
        All ({ originalData.length })
      </Button>

      {/* Individual filter btns */}
      <ButtonGroup color="primary" aria-label="outlined primary button group" className="filters-btn-group">
        { Object.keys(ratings).map((rank, index) => {
          const ratingInfo = RATINGS_INFO[rank];

          return (
            <Button 
              key={index}
              variant="outlined"
              className="filters-btn"
              title={ratingInfo.name}
              style={{ 
                backgroundColor: selectedBtnBackground(selectedFilters[index]),
                color: selectedBtnTextColor(selectedFilters[index]), 
              }}
              onClick={() => onIndividualFilterBtnClick(index)}
            >
              { ratingInfo.emoji } ({ ratings[rank] })
            </Button>
          )}
        )}
      </ButtonGroup> 
    </div>
  );
}

Filters.propTypes = {
  originalData: PropTypes.array.isRequired,
  setCurrentData: PropTypes.func.isRequired,
};

export default Filters;
