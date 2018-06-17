'use strict';

/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
import CONSTANT from '../../config/constants';

/**
 * Accessories schema
 */
const accessoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    types: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    soldQuantity: {
        type: Number,
        min: 0,
        default: 0
    },
    images: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

export default mongoose.model(CONSTANT.SCHEMA.ACCESSORIES, accessoriesSchema);
