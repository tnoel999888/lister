import React, { useState } from "react";
import PropTypes from "prop-types";
import { block } from "bem-cn";
import Icon from "@mdi/react";
import { mdiSortCalendarAscending, mdiSortCalendarDescending, mdiSortAlphabeticalAscendingVariant, mdiFilterVariant  } from "@mdi/js";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { connect } from "react-redux";
import { setCurrentData } from "../../reducers/rootReducer";

import "./sort.scss";

const CSS_BLOCK_NAME = "sort";
const blk = block(CSS_BLOCK_NAME);

function Sort({ currentData, setCurrentData }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const SORT_MODES = {
        reverseChronological: {
            id: "reverseChronological",
            label: "New → Old",
            handler: () => {
                setCurrentData([...currentData].sort(([,,,,index1],[,,,,index2]) => index1 - index2));
                setValue(SORT_MODES.reverseChronological);
                handleClose();
            },
            icon: <Icon path={mdiSortCalendarAscending} size={1} />
        },
        chronological: {
            id: "chronological",
            label: "Old → New",
            handler: () => {
                setCurrentData([...currentData].sort(([,,,,index1],[,,,,index2]) => index2 - index1));
                setValue(SORT_MODES.chronological);
                handleClose();
            },
            icon: <Icon path={mdiSortCalendarDescending} size={1} />
        },
        alphabetical: {
            id: "alphabetical",
            label: "Alphabetical",
            handler: () => {
                setCurrentData([...currentData].sort());
                setValue(SORT_MODES.alphabetical);
                handleClose();
            },
            icon: <Icon path={mdiSortAlphabeticalAscendingVariant} size={1} />
        },
        ratingsGrouped: {
            id: "ratingsGrouped",
            label: "Ranked",
            handler: () => {
                setCurrentData([...currentData].sort((a,b) => a[1].localeCompare(b[1])).reverse());
                setValue(SORT_MODES.ratingsGrouped);
                handleClose();
            },
            icon: <Icon path={mdiFilterVariant} size={1} />
        },
    };
  
    const [value, setValue] = useState(SORT_MODES.reverseChronological);

    return (
        <div className={blk()}>
            <span className={blk("label")}>Sort:</span>
      
            <div>
                <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="outlined"
                    className="sort-btn"
                    onClick={handleClick}
                >
                    <span className={blk("menu-content")}>
                        <span className={blk("menu-icon")}>{ value.icon }</span>
                        <span className={blk("menu-label")}>{ value.label }</span>
                    </span>
                    <ArrowDropDownIcon />
                </Button>

                <Menu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    { Object.values(SORT_MODES).map((mode, index) => (
                        <div key={index}>
                            <MenuItem onClick={mode.handler}>
                                <span className={blk("menu-item-icon")}>{mode.icon}</span>
                                <ListItemText primary={mode.label} />
                            </MenuItem >
                        </div>
                    ))}
                </Menu>
            </div>
        </div>
    );
}

Sort.propTypes = {
    currentData: PropTypes.array.isRequired,
    setCurrentData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    currentData: state.currentData, 
});

const mapDispatchToProps = {
    setCurrentData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
