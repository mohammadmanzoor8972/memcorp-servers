'use strict';

/**
 * Module dependencies.
 */
import express from 'express';

import CategoriesController from './controller';

const router = express.Router();

router.get('/', CategoriesController.getCategories);

router.post('/', CategoriesController.addCategory);

export default router;