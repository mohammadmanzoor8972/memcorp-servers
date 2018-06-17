'use strict';

/**
 * Module dependencies.
 */
import express from 'express';

import accessoriesRouter from './accessories/router';
import brandsRouter from './brands/router';
import categoriesRouter from './categories/router';
import productsRouter from './products/router';

const router = express.Router();

router.use('/accessories', accessoriesRouter);
router.use('/brands', brandsRouter);
router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);

export default router;
