import React from "react";
import { block } from "bem-cn";
import { Item } from "../Item";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import "./items.scss";

const CSS_BLOCK_NAME = "items";
const blk = block(CSS_BLOCK_NAME);

function Items({ currentData, originalData }) {
    return (
        <div className={blk()}>
            {currentData
                /* eslint-disable no-unused-vars */
                .map(([name, rating, review, date, rank, index]) => {
                    return (
                        <Item 
                            key={name}
                            index={originalData.length - index}
                            name={name}
                            rating={rating}
                            review={review}
                        />
                    );
                })
                /* eslint-enable no-unused-vars */
            }
        </div>
    );
}

Items.propTypes = {
    currentData: PropTypes.array.isRequired,
    originalData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    currentData: state.currentData, 
    originalData: state.originalData, 
});

export default connect(mapStateToProps)(Items);
