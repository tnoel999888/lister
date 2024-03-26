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

  const selectedBtnBackground = (selected) => selected ? "#4fcdff" : "white";
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

  // Set all btn as selected if no other btns selected
  useEffect(() => {
    setAllBtnSelected(!Object.values(selectedFilters).length);
  }, [selectedFilters]);

  useEffect(() => {
    if (allBtnSelected) {
      setCurrentData(originalData);
    }
  }, [allBtnSelected, originalData, setCurrentData]);

  return (
    <div className={blk()}>
      <span className={blk("button")}>
        <Button
          color="primary" 
          variant="outlined"
          style={{ 
            backgroundColor: selectedBtnBackground(allBtnSelected), 
            color: selectedBtnTextColor(allBtnSelected), 
          }}
          onClick={() => {
            setSelectedFilters({});
            setCurrentData(originalData);
          }}
        >
          All ({ originalData.length })
        </Button>
      </span>

      <ButtonGroup color="primary" aria-label="outlined primary button group">
        { Object.keys(ratings).map((rank, index) => {
          return (
            <Button 
              key={index}
              variant="outlined"
              style={{ 
                backgroundColor: selectedBtnBackground(selectedFilters[index]),
                color: selectedBtnTextColor(selectedFilters[index]), 
              }}
              onClick={() => {
                if (selectedFilters[index] !== undefined) {
                  delete selectedFilters[index];
                } else {
                  selectedFilters[index] = true;
                }

                setSelectedFilters({...selectedFilters});
                setCurrentData(originalData.filter(([,,,rank]) => selectedFilters[rank])); 
              }}
            >
              { RATINGS_INFO[rank].name } { RATINGS_INFO[rank].emoji } ({ ratings[rank] })
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
