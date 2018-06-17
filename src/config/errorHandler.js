'use strict';

import util from 'util';

import errorCodes from './errorCodes';
import CONSTANTS from './constants';


const _getErrorDetails = (err, callback) => {
    if(errorCodes[err.errNum]) {
        const errorObj = errorCodes[err.errNum];
        const status = errorObj.htmlStatus ? errorObj.htmlStatus : CONSTANTS.DEFAULT_ERROR_STATUS_CODE;
        errorObj.error = true;
        delete errorObj.htmlStatus;
        if(err.errors) {
            errorObj.messages = err.errors;
        }
        callback(status, errorObj);
    } else {
      console.log("Unknown Error code:  ", err.errNum);
      callback(CONSTANTS.DEFAULT_ERROR_STATUS_CODE, CONSTANTS.DEFAULT_ERROR);
    }
}

class ErrorHandler {
         
    getFormattedError(req, res, error, callback) {
        if (!error.errNum) {
            CONSTANTS.DEFAULT_ERROR.userMessage = error;
            callback(CONSTANTS.DEFAULT_ERROR_STATUS_CODE, CONSTANTS.DEFAULT_ERROR);
        } else {
            _getErrorDetails(error, callback);
        }
    }

    getFormattedMongooseDatabaseErrors(err, callback) {
        const errors = [];      
        const messages = {
            'required': "%s is required.",
            'min': "%s below minimum.",
            'max': "%s above maximum.",
            'enum': "%s not an allowed value.",
            'unique': "%s must be unique. %s is already exist in database.",
        };

        switch(err.name) {
            case 'ValidationError': 
                Object.keys(err.errors).forEach( (field) => {
                    const eObj = err.errors[field].properties;
                    console.log("eObj:  ", eObj);
                    
                    if (eObj.type && eObj.type === 'unique' && eObj.path && err.errors[field].value) {
                        errors.push(util.format(messages[eObj.type], eObj.path, err.errors[field].value));
                    } else if(eObj.type && eObj.path) {  //Otherwise, use util.format to format the message, and passing the path
                        errors.push(util.format(messages[eObj.type], eObj.path));
                    } 
                    else if(err.errors[field].hasOwnProperty("message")) {
                        errors.push(err.errors[field].message);
                    } 
                });
                break;
            
            case 'MongoError':
                errors.push('Duplicate Record');
                break
        }

        console.log(">>>>>>>>>>>>", errors);
        return _getErrorDetails({errNum: CONSTANTS.ERROR_CODES.REQUIRED_DATA_MISSING, errors}, callback);
    }

}

export default new ErrorHandler();
