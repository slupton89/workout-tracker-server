'use strict';

require('dotenv').config();

module.exports = {
      PORT: process.env.PORT || 8080,
      CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
      DATABASE_URL: process.env.DATABASE_URL || 'mongodb://dev:devPassword1@ds045107.mlab.com:45107/workout-tracker-db',
      TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'mongodb://dev:devPassword1@ds055699.mlab.com:55699/workout-tracker-test-db',
      JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
      JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};
