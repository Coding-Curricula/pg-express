const { Client } = require('pg');

const connectionString = 'https://localhost:5432/teamun';

// create new client
const client = new Client({
    connectionString
});

// connect to client
module.exports = client;
