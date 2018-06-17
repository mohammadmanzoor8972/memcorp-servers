'use strict';

/**
 * Module dependencies.
 */
import CategoriesModel from './model';
import CONSTANTS from './../../config/constants';

class CategoriesController {

    getCategories(req, res, next) {
        try {
			CategoriesModel.find({}, (err, response) => {
				if(err) { 
                    next({
                        errNum: CONSTANTS.ERROR_CODES.UNEXPECTED_ERROR
                    });
				} else { 
					res.send({error: false, categories: response});	
				}
			});
		} catch(e) {
			next({
                errNum: CONSTANTS.ERROR_CODES.UNEXPECTED_ERROR
            });
		}
    }

    addCategory(req, res, next) {
        const categoryObj = new CategoriesModel();
        const body = req.body;

        categoryObj.name = body.name;

        categoryObj.save((err) => {
            if (err) {
                next(err);
            } else {
                res.send({error: false, message: "Category Added Successfully."});
            }
        });
    }
}

export default new CategoriesController();