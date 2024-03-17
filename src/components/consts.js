export const ratingsColours = {
    10:  "#9d100f",
    15:  "#9d100f",
    20:  "#9d100f",
    25:  "#9d100f",
    30:  "#9d100f",
    35:  "#9d100f",
    40:  "#9d100f",
    45:  "#9d100f",
    50:  "#dc8a0e",
    55:  "#dc8a0e",
    60:  "#dcb20e",
    65:  "#d1a90a",
    70:  "#9bad0f",
    75:  "#92a30b",
    80:  "#72a403",
    85:  "#669104",
    90:  "#4c8200",
    95:  "#4d7300",
    99:  "#17b19d",
};

const emojis = {
    poo: "💩",
    thumbDown: "👎",
    wave: "👋",
    thumbUp: "👍",
    praise: "🙌",
    love: "❤️",
    trophy: "🏆",
}

export const getRatingEmoji = (rating) => {
    if (rating <= 15) {
        return emojis.poo;
    }
    if (rating <= 45) {
        return emojis.thumbDown;
    }
    if (rating <= 65) {
        return emojis.wave;
    }
    if (rating <= 75) {
        return emojis.thumbUp;
    }
    if (rating <= 85) {
        return emojis.praise;
    }
    if (rating <= 95) {
        return emojis.love;
    }
    if (rating <= 99) {
        return emojis.trophy;
    }
}
