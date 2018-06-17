'use strict';

/**
 * Module dependencies.
 */
import dotenv from 'dotenv';
import path from 'path';

if(!process.env.NODE_ENV) {
    dotenv.config({path: path.resolve(__dirname, '../.env')});
}
