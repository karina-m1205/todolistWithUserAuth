const { InvalidOffset, InvalidLimit, IdIsRequired, TitleRequired, } = require("./customError.js");

function isFiniteOffset(param) {
    if (!isFinite(param)) {
        throw new InvalidOffset();
    };
};

function isFiniteLimit(param) {
    if (!isFinite(param)) {
        throw new InvalidLimit();
    };
};

function isIdValid(param) {
    if (!param || param.trim() === "") {
        throw new IdIsRequired();
    };
};

function isTitleValid(param) {
    if (typeof param !== "string" || param.trim() === "") {
        throw new TitleRequired();
    };
}

module.exports = {
    isFiniteOffset,
    isFiniteLimit,
    isIdValid,
    isTitleValid,
}