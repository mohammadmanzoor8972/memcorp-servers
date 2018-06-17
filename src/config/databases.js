'use strict';

/**
 * Module dependencies.
 */
import mongoose from 'mongoose';

import CONSTANTS from './constants';

mongoose.Promise = global.Promise;

const connectDB = (callback) => {

  mongoose.connect(CONSTANTS.MONGOOSE_DB.URL, function(err) {
      if (err) {
          if (callback) callback(err);
      } else {
          mongoose.set('debug', CONSTANTS.MONGOOSE_DB.DEBUG);
          console.log("MongoDB connected on:  ", CONSTANTS.MONGOOSE_DB.URL);
          if (callback) callback(null);
      }
  });
};

export const disconnectDB = (callback) => {
  mongoose.disconnect(function(err) {
	  callback(err);
  });
};

export default connectDB;