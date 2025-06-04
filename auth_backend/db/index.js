const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bootcamp',
  password: 'helloworld',
  port: 5432
});

module.exports = pool;
