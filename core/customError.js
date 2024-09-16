
class CustomError extends Error {
    constructor(msg, code) {
        super(msg);
        this.code = code;
    };
};

class IdIsRequired extends CustomError{
    constructor(){
        super("item's id is required",400);
    };
};

class ItemsNotFound extends CustomError{
    constructor(){
        super("items not found",404);
    };
};

class ItemNotFound extends CustomError{
    constructor(){
        super("item not found",404);
    };
};

class ItemExists extends CustomError{
    constructor(){
        super("item already exists",409);
    };
};

class TitleRequired extends CustomError{
    constructor(){
        super("item's title required and must be a string",400);
    };
};

class TitleInUse extends CustomError {
    constructor() {
        super("this title is already in use. choose another one", 409);
    };
};

class InvalidOffset extends CustomError {
    constructor() {
        super("invalid offset", 400);
    };
};

class InvalidLimit extends CustomError {
    constructor() {
        super("invalid limit", 400);
    };
};

module.exports = {
    IdIsRequired,
    ItemsNotFound,
    ItemNotFound,
    ItemExists,
    TitleRequired,
    TitleInUse,
    InvalidOffset,
    InvalidLimit,
};