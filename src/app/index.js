'use strict';

/**
 * Module dependencies.
 */
import errorHandler from '../config/errorHandler';

import router from './v1Routes';

const mongooseErrors = ['ValidationError', 'MongoError'];

const appInit = (app) => {
	
	app.all('/api/*', function(req, res, next){
		console.log('server setup testing......');
		next();
	});

	app.use('/api/v1/', router);
	
	app.use((err, req, res, next) => {
		if (!err) {
			return next();
		}

		if (mongooseErrors.indexOf(err.name) > -1) {
			errorHandler.getFormattedMongooseDatabaseErrors(err, (errStatus, errorObj) => {
				res.status(errStatus).send(errorObj);
			});
		} else {
			errorHandler.getFormattedError(req, res, err, function(errStatus, errorObj) {
				res.status(errStatus).send(errorObj);
			});
		}
		
	});
}

export default appInit;