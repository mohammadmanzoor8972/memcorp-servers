'use strict';

/**
 * Module dependencies.
 */
import BrandsModel from './model';
import CONSTANTS from './../../config/constants';

class BrandsController {

    getBrands(req, res, next) {
        try {
			BrandsModel.find({}, (err, response) => {
				if(err) { 
                    next({
                        errNum: CONSTANTS.ERROR_CODES.UNEXPECTED_ERROR
                    });
				} else { 
					res.send({error: false, brands: response});	
				}
			});
		} catch(e) {
			next({
                errNum: CONSTANTS.ERROR_CODES.UNEXPECTED_ERROR
            });
		}
    }

    addBrand(req, res, next) {
        const brandObj = new BrandsModel();
        const body = req.body;

        brandObj.name = body.name;

        brandObj.save((err) => {
            if (err) {
                next(err);
            } else {
                res.send({error: false, message: "Brand Added Successfully."});
            }
        });
    }
}

export default new BrandsController();