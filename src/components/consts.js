export const ratingsColours = {
    10:  "#8a0606",
    15:  "#8a0606",
    20:  "#9d100f",
    25:  "#9d100f",
    30:  "#a7340d",
    35:  "#a7340d",
    40:  "#d55f10",
    45:  "#d55f10",
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
};

export const RATINGS_INFO = {
    0: {
        name: "Awful",
        emoji: emojis.poo,
        rank: 0,
    },
    1: {
        name: "Bad",
        emoji: emojis.thumbDown,
        rank: 1,
    },
    2: {
        name: "OK",
        emoji: emojis.wave,
        rank: 2,
    },
    3: {
        name: "Good",
        emoji: emojis.thumbUp,
        rank: 3,
    },
    4: {
        name: "Great",
        emoji: emojis.praise,
        rank: 4,
    },
    5: {
        name: "Love",
        emoji: emojis.love,
        rank: 5,
    },
    6: {
        name: "Top",
        emoji: emojis.trophy,
        rank: 6,
    },
};

export const getRatingInfo = (rating) => {
    if (rating <= 15) {
        return RATINGS_INFO[0];
    }
    if (rating <= 45) {
        return RATINGS_INFO[1];
    }
    if (rating <= 65) {
        return RATINGS_INFO[2];
    }
    if (rating <= 75) {
        return RATINGS_INFO[3];
    }
    if (rating <= 85) {
        return RATINGS_INFO[4];
    }
    if (rating <= 95) {
        return RATINGS_INFO[5];
    }
    if (rating <= 99) {
        return RATINGS_INFO[6];
    }
};
