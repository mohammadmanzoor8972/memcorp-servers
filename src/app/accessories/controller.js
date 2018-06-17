'use strict';

/**
 * Module dependencies.
 */
import async from 'async';

import AccessoriesModel from './model';
import CONSTANTS from './../../config/constants';

class AccessoriesController {

    getAccessories(req, res, next) {
        const searchQuery = {};
    
        if(req.body.search && req.body.search !== "") {
            searchQuery.name = { '$regex' : req.body.search, '$options' : 'ig' };
        }

        AccessoriesModel.find(searchQuery, '-__v -updatedAt', (err, response) => {
            if(err) { 
                next({
                    errNum: CONSTANTS.ERROR_CODES.UNEXPECTED_ERROR
                });
            } else { 
                res.send({error: false, accessories: response});	
            }
        });
    }

    getAccessoryById(req, res, next) {
        if(req.params.id) {
            AccessoriesModel.findById(req.params.id, '-__v -updatedAt', (err, response) => {
                if(err) { 
                    next({
                        errNum: CONSTANTS.ERROR_CODES.UNEXPECTED_ERROR
                    });
                } else { 
                    res.send({error: false, response});	
                }  
            });
        } else {
            next({errNum: CONSTANTS.ERROR_CODES.MISSING_INFO_IN_API});
        }
    }

    addAccessory(req, res, next) {
        const accessoryObj = new AccessoriesModel();
        const body = req.body;

        accessoryObj.name = body.name;
        accessoryObj.description = body.description;
        accessoryObj.types = body.types;
        accessoryObj.price = body.price;
        accessoryObj.quantity = body.quantity;
        accessoryObj.soldQuantity = body.soldQuantity;
        accessoryObj.images = body.images;

        accessoryObj.save((err) => {
            if (err) {
                next(err);
            } else {
                res.send({error: false, message: "Accessory Added Successfully."});
            }
        });
    }

    updateAccessoriesQuantity(req, res, next) {
        async.eachSeries(req.body.accessories || [], (accessory, cb) => {
            AccessoriesModel.update({'_id': accessory.id, $where: "this.quantity > this.soldQuantity" }, { $inc: { soldQuantity: parseInt(accessory.quantity, 10) || 1} }, (err, response) => {
                if(err) { 
                    console.log(err);
                    cb(err);     
                } else { 
                    cb(null, {error: false});	
                }
            });
        }, (err) => {
            if(err) {
                next(err);
            } else {
                res.send({error: false, message: "All accessories updated"});
            }
        });
    }
}

export default new AccessoriesController();