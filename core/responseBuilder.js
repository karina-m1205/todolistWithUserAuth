function responseBuilder(req, data) {
    const { startTime } = req;
    if(!Array.isArray(data)){
        data = [data];
    }
    const itemsCount = data.length;
    const duration = Date.now() - startTime;
    return {
        count: itemsCount,
        duration: duration,
        data: data,
    }
};

module.exports = responseBuilder;

