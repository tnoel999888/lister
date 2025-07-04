import React from "react";
import { block } from "bem-cn";
import { LoadingItem } from "../Item";
import { connect } from "react-redux";

import "./loading-items.scss";

const CSS_BLOCK_NAME = "loading-items";
const blk = block(CSS_BLOCK_NAME);

function randomIntFromInterval(min, max) {
  // returns a random integer between min and max (inclusive)
  // slightly skews towards smaller numbers as entries with longer names are less likely
  return Math.floor(Math.pow(Math.random(), 5) * (max - min + 1) + min);
}

function LoadingItems() {
    let currentData = new Array(100).fill({});

    return (
        <div className={blk()}>
            {currentData
                .map(() => {
                    return (
                        <LoadingItem width={randomIntFromInterval(160, 300)} />
                    );
                })
            }
        </div>
    );
}

export default LoadingItems;
