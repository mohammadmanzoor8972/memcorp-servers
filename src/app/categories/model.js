'use strict';

/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
import CONSTANT from '../../config/constants';

/**
 * Categories schema
 */
const CategoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model(CONSTANT.SCHEMA.CATEGORIES, CategoriesSchema);
