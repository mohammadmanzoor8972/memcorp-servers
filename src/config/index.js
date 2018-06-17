'use strict';

/**
 * Module dependencies.
 */
import initExpressApp from './express';
import connectDB, {disconnectDB} from './databases';

const start =(callback) => {
    connectDB(function(err) {
        if(err) {
            console.log("Error in connecting db", err);
        } else {
            const app = initExpressApp();
            if (callback) callback(app);
        }
    });
}

export const stop = (callback) => {
    disconnectDB(() => {
      console.log("DB disconnected");
      callback();
    });
}

export default start;