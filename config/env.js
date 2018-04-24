require('dotenv').config();//instantiate environment variables

let ENV = {} //Make this global to use all over the application

ENV.app          = process.env.APP   || 'development';
ENV.port         = process.env.PORT  || '3000';

ENV.db_dialect   = process.env.DB_DIALECT    || 'mongo';
ENV.db_host      = process.env.DB_HOST       || 'localhost';
ENV.db_port      = process.env.DB_PORT       || '27017';
ENV.db_name      = process.env.DB_NAME       || 'name';
ENV.db_user      = process.env.DB_USER       || null;
ENV.db_password  = process.env.DB_PASSWORD   || null;
ENV.db_url       = process.env.DB_URL        || null;

ENV.jwt_encryption  = process.env.JWT_ENCRYPTION || 'jwt_please_change';
ENV.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

module.exports = ENV;
