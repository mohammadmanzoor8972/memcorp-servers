'use strict';

/**
 * Module dependencies.
 */
import express from 'express';

import BrandsController from './controller';

const router = express.Router();

router.get('/', BrandsController.getBrands);

router.post('/', BrandsController.addBrand);

export default router;