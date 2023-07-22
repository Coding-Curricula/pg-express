const client = require('./client');

// drop tables in correct order
async function dropTables() {
    try {
        console.log('Starting to drop tables...');
        await client.query(`
            DROP TABLE IF EXISTS films;
        `);
        console.log('Finished dropping tables!');
    } catch (error) {
        console.error('Error dropping tables!');
        throw error;
    }
}

// build new tables
async function createTables() {
    try {
        console.log('Starting to build tables...');
        await client.query(`
            CREATE TABLE films (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                released DATE NOT NULL,
                genre VARCHAR(255) NOT NULL,
                director VARCHAR(255) NOT NULL
                );
            `);

        console.log('Finished building tables!');

    } catch (error) {
        console.error('Error building tables!');
        throw error;
    }
}

// create initial data in tables
async function createInitialData() {
    try {
        console.log('Starting to create initial data...');
        await client.query(`
            INSERT INTO films (title, released, genre, director)
            VALUES ('The Shawshank Redemption', '1994-09-23', 'Drama', 'Frank Darabont'),
            ('The Godfather', '1972-03-15', 'Crime', 'Francis Ford Coppola'),
            ('The Godfather: Part II', '1974-12-12', 'Crime', 'Francis Ford Coppola'),
            ('The Dark Knight', '2008-07-18', 'Action', 'Christopher Nolan')
        `);
        console.log('Finished creating initial data!');

    } catch (error) {
        console.error('Error creating initial data!');
        throw error;
    }
}

// async rebuild function
async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialData();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    rebuildDB
}