'use strict';

export default {
  MONGOOSE_DB: {
    URL: process.env.MONGOLAB_URI || "mongodb://rate8test:rate8test@ds045614.mlab.com:45614/mongo_test",
    DEBUG: process.env.MONGODB_DEBUG || true
  },
  PORT: process.env.PORT || 80,
  HOST: process.env.HOST || 'localhost',
  ADMIN_SECRET_KEY: 'harpreet-admin',

  SESSION_SECRET: process.env.SESSION_SECRET || "test_session",
  JWT_SECRET: process.env.JWT_SECRET || "harrytestjwt",

  SUPPORT_EMAILID: 'support@ecommerce.com',

  SCHEMA: {
    PRODUCTS: 'products',
    CATEGORIES: 'categories',
    BRANDS: 'brands',
    ACCESSORIES: 'accessories'
  },

  DEFAULT_LANGUAGE: "en-us",
  DEFAULT_ERROR_STATUS_CODE: 401, //500,
  DEFAULT_ERROR: {
    "errorCode": 1004,
    "error": true,
    "language": "en-us",
    "userMessage": "An unexpected error has occurred. Please try again later"
  },
  ERROR_CODES: {
    REQUIRED_DATA_MISSING: 1000,
    CONTENT_NOT_FOUND: 1001,
    PROCESS_COULD_NOT_BE_COMPLETED: 1002,
    MISSING_INFO_IN_API: 1003,
    UNEXPECTED_ERROR: 1004
  }
};
