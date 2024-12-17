const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

let sequelize;

switch (process.env.DB_TYPE) {
  case 'postgres':
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: process.env.DB_PORT || 5432,
    });
    break;
  case 'mssql':
    sequelize = new Sequelize(process.env.DB_NAME, 'sa', process.env.DB_PASSWORD, {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mssql',
      port: process.env.DB_PORT || 1433,
    });
    break;
  case 'sqlite':
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: process.env.SQLITE_DB_PATH || './sqlite/database.sqlite',
    });
    break;
  default:
    throw new Error('Unsupported DB type');
}

module.exports = sequelize;
