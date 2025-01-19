import React from "react";
import { block } from "bem-cn";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { setCurrentData } from "../../reducers/rootReducer";

import "./search.scss";

const CSS_BLOCK_NAME = "search";
const blk = block(CSS_BLOCK_NAME);

function Search({ originalData, setCurrentData }) {

    const onSearch = event => {
        const inputStr = event.target.value;

        if (inputStr === "") {
            setCurrentData([...originalData]);
        } else {
            setCurrentData([...originalData].filter(data => data[0].toLowerCase().includes(inputStr.toLowerCase())));
        }
    };

    return (
        <div className={blk()}>
            <span className={blk("label")}>Search:</span>
            <Paper component="form" elevation={0} className="search-root">
                <InputBase
                    className="search-input"
                    onChange={onSearch}
                    placeholder="Enter text..."
                    inputProps={{ "aria-label": "search" }}
                    fullWidth
                />
                <IconButton type="submit" aria-label="search" className="search-icon-btn">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    );
}

Search.propTypes = {
    originalData: PropTypes.array.isRequired,
    setCurrentData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    originalData: state.originalData, 
});

const mapDispatchToProps = {
    setCurrentData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
