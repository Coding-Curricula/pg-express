const client = require('./client');

// GET - /api/films - get all films - PUBLIC
async function getAllFilms() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM films;
        `);

        return rows;
    } catch (error) {
        throw error;
    }
}

// GET - /api/films/:id - get a film by id - PUBLIC
async function getFilmById(id) {
    try {
        const { rows: [film] } = await client.query(`
            SELECT * FROM films
            WHERE id=$1;
        `, [id]);

        return film;
    } catch (error) {
        throw error;
    }
}

// POST - /api/films - create a new film - PUBLIC
async function createFilm({ title, released, genre, director }) {
    try {
        const { rows: [film] } = await client.query(`
            INSERT INTO films (title, released, genre, director)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [title, released, genre, director]);

        return film;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/films/:id - update a film by id - PUBLIC
async function updateFilm(id, fields = {}) {
    // read off the fields
    const { title, released, genre, director } = fields;

    // start the update query
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [film] } = await client.query(`
            UPDATE films
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, [title, released, genre, director]);

        return film;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/films/:id - delete a film by id - PUBLIC
async function deleteFilm(id) {
    try {
        const { rows: [film] } = await client.query(`
            DELETE FROM films
            WHERE id=$1
            RETURNING *;
        `, [id]);

        return film;
    } catch (error) {
        throw error;
    }
}

// export them as modules
module.exports = {
    getAllFilms,
    getFilmById,
    createFilm,
    updateFilm,
    deleteFilm
};