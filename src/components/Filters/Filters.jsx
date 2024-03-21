import React, { useState } from 'react';
import { block } from 'bem-cn';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PropTypes from "prop-types";
import { RATINGS_INFO, getRatingInfo } from '../consts';

import './filters.scss';

const CSS_BLOCK_NAME = 'filters';
const blk = block(CSS_BLOCK_NAME);

function Filters({ originalData, setCurrentData, setFilters }) {

  const ratings = {};

  originalData.forEach(([name, rating, review]) => {
    const ratingInfo = getRatingInfo(rating);
    if (ratings[ratingInfo.rank]) {
      ratings[ratingInfo.rank]++;
    } else  {
      ratings[ratingInfo.rank] = 1;
    }
  });

  const [allBtnSelected, setAllBtnSelected] = useState(true);
  const [selectedBtns, setSelectedBtns] = useState({});
  const [rerender, setRerender] = useState(false);

  return (
    <div className={blk()}>
      <span className={blk("button")}>
        <Button
          color="primary" 
          style={{
            backgroundColor: allBtnSelected ? "#4fcdff" : "transparent",
          }}
          variant={allBtnSelected ? "contained" : "outlined"}
          onClick={() => {
            setSelectedBtns({});
            setAllBtnSelected(true);
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
            style={{
              backgroundColor: selectedBtns[index] ? "#4fcdff" : "transparent",
            }}
            variant={selectedBtns[index] ? "contained" : "outlined"}
            onClick={() => {
              if (selectedBtns[index] !== undefined) {
                selectedBtns[index] = !selectedBtns[index];
              } else {
                selectedBtns[index] = true;
              }
  
              const newSelectedBtns = {...selectedBtns};
              setSelectedBtns(newSelectedBtns);
              setFilters(newSelectedBtns); // need to create new object to trigger re-render
  
              if (!Object.values(newSelectedBtns).includes(true)) {
                setAllBtnSelected(true);
              } else {
                setAllBtnSelected(false);
              }
  
              setRerender(!rerender);
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
  setFilters: PropTypes.func.isRequired,
};

export default Filters;
