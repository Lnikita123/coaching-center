const mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};


const isValidString = function (value) {
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const isValidTitle = function (title) {
    return ["9 to 11", "2 to 4", "6 to 8"].indexOf(title) !== -1;
  };



module.exports= {isValid, isValidRequestBody, isValidObjectId, isValidString, isValidTitle}