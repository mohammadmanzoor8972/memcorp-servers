'use strict';

/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
import CONSTANT from '../../config/constants';

/**
 * Products schema
 */
const productsSchema = mongoose.Schema({
    sku: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CONSTANT.SCHEMA.CATEGORIES,
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CONSTANT.SCHEMA.BRANDS,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        required: true
    },
    numberOfStrings: {
        type: Number,
        default: 0
    },
    soldDate: {
        type: Date
    },
    rating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model(CONSTANT.SCHEMA.PRODUCTS, productsSchema);
