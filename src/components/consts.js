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
    98:  "#17b19d",
    99:  "#17b19d",
};

const emojis = {
    poo: "💩",
    thumbDown: "👎",
    wave: "👋",
    thumbUp: "👍",
    praise: "🙌",
    love: "❤️",
    star: "🌟",
}

export const getRatingEmoji = (rating) => {
    if (rating < 20) {
        return emojis.poo;
    }
    if (rating < 50) {
        return emojis.thumbDown;
    }
    if (rating < 70) {
        return emojis.wave;
    }
    if (rating < 80) {
        return emojis.thumbUp;
    }
    if (rating < 90) {
        return emojis.praise;
    }
    if (rating < 98) {
        return emojis.love;
    }
    if (rating < 100) {
        return emojis.star;
    }
}
