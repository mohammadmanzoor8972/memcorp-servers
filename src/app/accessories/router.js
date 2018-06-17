'use strict';

/**
 * Module dependencies.
 */
import express from 'express';

import AccessoriesController from './controller';

const router = express.Router();

router.post('/', AccessoriesController.getAccessories);

router.get('/:id', AccessoriesController.getAccessoryById);

router.post('/add', AccessoriesController.addAccessory);

router.post('/buynow', AccessoriesController.updateAccessoriesQuantity);

export default router;