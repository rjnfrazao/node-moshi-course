function log (res,req,next) {
    console.log('Executing Logging..');
    next();
};

module.exports = log;