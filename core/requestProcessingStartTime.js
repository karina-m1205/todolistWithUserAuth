function requestProcessingStartTime(req, res, next) {
    req.startTime = Date.now();
    next();
};

module.exports = requestProcessingStartTime;
