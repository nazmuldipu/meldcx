const logger = param => store => next => action => {
    // console.log("Logging", param, action.type);
    next(action);
};

export default logger;