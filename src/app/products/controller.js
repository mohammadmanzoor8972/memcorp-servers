'use strict';

/**
 * Module dependencies.
 */
import async from 'async';

import ProductsModel from './model';
import CONSTANTS from './../../config/constants';

class ProductsController {

    getProducts(req, res, next) {      
        const searchQuery = {};
        
        if(req.body.search) {
            searchQuery['$or'] = [
                {'name': { '$regex' : req.body.search, '$options' : 'ig' }},
                {'sku': { '$regex' : req.body.search, '$options' : 'ig' }}
            ];
        }

        if(req.body.brandIds && req.body.brandIds.length > 0) {
            searchQuery.brandId = { '$in' : req.body.brandIds }
        }

        if(req.body.categoryIds && req.body.categoryIds.length > 0) {
            searchQuery.categoryId = { '$in' : req.body.categoryIds }
        }

        if(req.body.numberOfStrings && req.body.numberOfStrings.length > 0) {
            searchQuery.numberOfStrings = { '$in' : req.body.numberOfStrings }
        }

        ProductsModel
            .find(searchQuery, '-__v -updatedAt')
            .populate('brandId', '_id name')
            .populate('categoryId', '_id name')
            .exec( (err, response) => {
            if(err) { 
                next({
                    errNum: CONSTANTS.ERROR_CODES.UNEXPECTED_ERROR
                });
            } else { 
                res.send({error: false, response});	
            }
        });
    }

    getProductById(req,res, next) {
        if(req.params.id) {
            ProductsModel.findById(req.params.id, '-__v -updatedAt', (err, response) => {
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

    addProduct(req, res, next) {
        const productObj = new ProductsModel();
        const body = req.body;

        productObj.sku = body.sku;
        productObj.name = body.name;
        productObj.description = body.description;
        productObj.categoryId = body.categoryId;
        productObj.brandId = body.brandId;
        productObj.price = body.price;
        productObj.numberOfStrings = body.numberOfStrings;
        productObj.rating = body.rating;
        productObj.images = body.images;

        productObj.save((err) => {
            if (err) {
                next(err);
            } else {
                res.send({error: false, message: "Product Added Successfully."});
            }
        });
    }

    updateProductSoldDate(req, res, next) {
        
        async.eachSeries(req.body.productIds || [], (productId, cb) => {
            ProductsModel.update({'_id': productId, 'soldDate': {$exists: false}}, { $set: { soldDate: new Date } }, (err, response) => {
                if(err) { 
                    cb(err);     
                } else { 
                    cb(null, {error: false});	
                }
            });
        }, (err) => {
            if(err) {
                next(err);
            } else {
                res.send({error: false, message: "Products sold date added"});
            }
        });
    }
}

export default new ProductsController();