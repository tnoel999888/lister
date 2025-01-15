import React, { useState, useEffect } from 'react';
import { block } from 'bem-cn';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PropTypes from "prop-types";
import { RATINGS_INFO, getRatingInfo } from '../consts';

import { connect } from "react-redux";
import { setCurrentData, setSelectedFilters } from "../../reducers/rootReducer";

import './filters.scss';

const CSS_BLOCK_NAME = 'filters';
const blk = block(CSS_BLOCK_NAME);

function Filters({ 
  originalData, 
  setCurrentData, 
  selectedFilters, 
  setSelectedFilters 
}) {

  const selectedBtnBackground = (selected) => selected ? "#1F96F3" : "white";
  const selectedBtnTextColor = (selected) => selected ? "white" : "#4f4e4e";
  const ratings = {};
  const [allBtnSelected, setAllBtnSelected] = useState(true);

  // Get count for each rating group
  originalData.forEach(([name, rating, review, date, rank, index]) => {
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
  }, [allBtnSelected, originalData, setCurrentData, setSelectedFilters]);

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
    setCurrentData(originalData.filter(([name, rating, review, date, rank, index]) => selectedFiltersCopy[rank])); 
  }

  return (
    <div>
      <span className={blk("label")}>Filter:</span>

      <div className={blk()}>
        {/* All button */}
        <Button
          color="primary" 
          variant="outlined"
          className="filters-all-btn"
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
    </div>
  );
}

Filters.propTypes = {
  originalData: PropTypes.array.isRequired,
  setCurrentData: PropTypes.func.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  setSelectedFilters: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  originalData: state.originalData, 
  selectedFilters: state.selectedFilters, 
});

const mapDispatchToProps = {
  setCurrentData,
  setSelectedFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
