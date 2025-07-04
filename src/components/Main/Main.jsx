import React, { useEffect } from "react";
import { Items, LoadingItems } from "../Items";
import { Controls } from "../Controls";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { block } from "bem-cn";
import { getRatingInfo } from "../consts";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import Papa from "papaparse";

import { connect } from "react-redux";
import {
    setCurrentData,
    setOriginalData,
    setRatingsHistogramData,
    setDatesHistogramData
} from "../../reducers/rootReducer";

import "./main.scss";

const CSS_BLOCK_NAME = "main";
const blk = block(CSS_BLOCK_NAME);

function Main({
    ratingsFile,
    setCurrentData,
    originalData,
    setOriginalData,
    setRatingsHistogramData,
    setDatesHistogramData
}) {

    let dataLoaded = false;

    if (originalData.length) {
        dataLoaded = true;
    }

    useEffect(() => {
        Papa.parse(
            ratingsFile, 
            {
                skipEmptyLines: true,
                download: true,
                complete: (results) => {
                    // Remove header line
                    results.data.shift();

                    // Reverse chronological order default
                    const reversedData = [...results.data].reverse(); 
                    const ratingsHistogramData = [];
                    const datesHistogramData = [];

                    // Add rank number and index to each data entry
                    reversedData.map((data, index) => {
                        const rating = data[1];
                        const date = data[3];
                        if (date) {
                            const dateParts = date.split("-");
                            const year = dateParts[2];
                            datesHistogramData.push(year);
                        }

                        // Add to histogram array, ceil used to create bucket size of 1
                        ratingsHistogramData.push(Math.ceil(rating / 10));

                        const ratingInfo = getRatingInfo(rating);
                        data.push(ratingInfo.rank);
                        return data.push(index);
                    });

                    setRatingsHistogramData(ratingsHistogramData);
                    setDatesHistogramData(datesHistogramData);
                    setOriginalData(reversedData);
                    setCurrentData(reversedData);
                },
                error: (error, file) => {
                    console.log("Error while parsing:", error, file);
                },
            }
        );
    }, [ratingsFile, setCurrentData, setOriginalData, setRatingsHistogramData, setDatesHistogramData]);

    return (
        <div className={blk()}>
            <div className={blk("content")}>
                <Controls />
                <Divider className="main-divider" />
                { dataLoaded ? <Items /> : <LoadingItems /> }
            </div>
        </div>
    );
}

Main.propTypes = {
    ratingsFile: PropTypes.string.isRequired,
    setCurrentData: PropTypes.func.isRequired,
    originalData: PropTypes.array.isRequired,
    setOriginalData: PropTypes.func.isRequired,
    setRatingsHistogramData: PropTypes.func.isRequired,
    setDatesHistogramData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    originalData: state.originalData, 
});

const mapDispatchToProps = {
    setOriginalData,
    setCurrentData,
    setRatingsHistogramData,
    setDatesHistogramData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
