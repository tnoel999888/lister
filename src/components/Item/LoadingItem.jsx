import React from "react";
import { block } from "bem-cn";
import PropTypes from "prop-types";
import "./loading-item.scss";

const CSS_BLOCK_NAME = "loading-item";
const blk = block(CSS_BLOCK_NAME);

function LoadingItem({ width }) {
    return (
        <div style={{ width }}>
            <div className={blk()} />
        </div>
    );
}

LoadingItem.propTypes = {
    width: PropTypes.number.isRequired,
};

export default LoadingItem;
