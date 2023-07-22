const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.POSTGRESQL_DB;

// create new client
const client = new Client({
    connectionString
});

// connect to client
module.exports = client;
