import { useState } from "react";
import { block } from "bem-cn";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { getRatingInfo, ratingsColours } from "../consts";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import "./item.scss";

const CSS_BLOCK_NAME = "item";
const blk = block(CSS_BLOCK_NAME);

function Item({ index, name, rating, review, date }) {

    const [state, setState] = useState({
        raised: false,
        shadow: 1,
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };

    const ratingInfo = getRatingInfo(rating);
    const ratingOutOfTen = Math.round(rating/10*2)/2;
    const raisedClass = state.raised ? (" " + blk("card-hovered")) : "";

    return (
        <div className={blk()}>
            <Card 
                className={blk("root") + raisedClass }
                style={{
                    backgroundColor: rating ? ratingsColours[rating] : "grey",
                    color: "#ffffff",
                    maxWidth: "fit-content"
                }}
                onMouseOver={() => setState({ raised: true, shadow: 3 })}
                onMouseOut={() => setState({ raised: false, shadow: 1 })} 
                raised={state.raised} 
                zdepth={state.shadow}
            >
                <CardContent>
                    <div>
                        <span className={blk("title")}>{ name }</span>
                        <span className={blk("index")}>#{ index }</span>
                    </div>
                    <div>
                        { rating ? (
                            <>
                                <span className={blk("rating")}>{ ratingOutOfTen }/10</span>
                                <span className={blk("emoji")} title={ratingInfo ? ratingInfo.name : ""}>{ ratingInfo.emoji }</span>
                            </>) : 
                            <span className={blk("rating")}>Not rated</span>
                        }
                        { review !== "" ? 
                            <span className={blk("review")}>
                                <IconButton onClick={handleOpen}>
                                    <RateReviewIcon />
                                </IconButton >
                            </span> : null
                        }
                    </div>  
                </CardContent>
            </Card>

            { review ?
                <Modal
                    className={blk("modal")}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <div className={blk("paper")}>
                                <div
                                    className={blk("modal-header")}
                                    style={{
                                        backgroundColor: ratingsColours[rating],
                                        color: "#ffffff",
                                    }}
                                >
                                    <h3 className={blk("modal-title")}>{name} - { ratingOutOfTen }/10 { ratingInfo.emoji }</h3>
                                    <span className={blk("modal-close")}>
                                        <IconButton onClick={handleClose}>
                                            <CloseIcon />
                                        </IconButton>
                                    </span>
                                </div>
                                <div className={blk("modal-content")}>
                                    <p className={blk("modal-content-review")}>{review}</p>
                                    <p className={blk("modal-content-date")}>{date}</p>
                                </div>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
                : null
            }
        </div>
    );
}

Item.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

export default Item;
