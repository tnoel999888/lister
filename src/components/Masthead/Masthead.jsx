import React, { Component } from 'react';
import { block } from 'bem-cn';
import './masthead.scss';

const CSS_BLOCK_NAME = 'masthead';
const blk = block(CSS_BLOCK_NAME);

class Masthead extends Component {
  render() {
		return (
      <div className={blk()}>
        <div className={blk('image')}></div>
      </div>
		);
	}
}

export default Masthead;
