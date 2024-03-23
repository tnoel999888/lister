import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from "prop-types";
import { block } from 'bem-cn';

import './sort.scss';

const CSS_BLOCK_NAME = 'sort';
const blk = block(CSS_BLOCK_NAME);

function Sort({ currentData, setCurrentData }) {
  const [value, setValue] = useState('reverseChronological');

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);

    if (value === "reverseChronological") {
      setCurrentData([...currentData].sort(([,,,,index1],[,,,,index2]) => index1 - index2));
    }
    if (value === "chronological") {
      setCurrentData([...currentData].sort(([,,,,index1],[,,,,index2]) => index2 - index1));
    }    
    if (value === "alphabetical") {
      setCurrentData([...currentData].sort());
    }
    if (value === "ratingsGrouped") {
      setCurrentData([...currentData].sort((a,b) => a[1].localeCompare(b[1])).reverse());
    }
  };
  
  return (
    <div className={blk()}>
      <div className={blk("radio-group")}>
        <RadioGroup aria-label="sort" name="sort" row value={value} onChange={handleChange}>
          <FormControlLabel value="reverseChronological" control={<Radio />} label="Reverse Chronological" />
          <FormControlLabel value="chronological" control={<Radio />} label="Chronological" />
          <FormControlLabel value="alphabetical" control={<Radio />} label="Alphabetical" />
          <FormControlLabel value="ratingsGrouped" control={<Radio />} label="Ratings Grouped" />
        </RadioGroup>
      </div>
    </div>
  );
}

Sort.propTypes = {
  currentData: PropTypes.array.isRequired,
  setCurrentData: PropTypes.func.isRequired,
};

export default Sort;
