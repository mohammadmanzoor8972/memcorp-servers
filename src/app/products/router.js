'use strict';

/**
 * Module dependencies.
 */
import express from 'express';

import ProductController from './controller';

const router = express.Router();

router.post('/', ProductController.getProducts);

router.get('/:id', ProductController.getProductById);

router.post('/add', ProductController.addProduct);

router.post('/buynow', ProductController.updateProductSoldDate);


export default router;