'use strict';

/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
import CONSTANT from '../../config/constants';

/**
 * Brands schema
 */
const brandsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model(CONSTANT.SCHEMA.BRANDS, brandsSchema);
