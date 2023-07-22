const express = require('express');
const router = express.Router();

// import SQL queries and async functions from db directory
const { getAllFilms, getFilmById, createFilm, updateFilm, deleteFilm } = require('../db');

// GET - /api/films - get all films - PUBLIC
router.get('/', async (req, res, next) => {
    try {
        const films = await getAllFilms();

        res.send(films);
    } catch (error) {
        next(error);
    }
});

// GET - /api/films/:id - get a film by id - PUBLIC
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const film = await getFilmById(id);

        res.send(film);
    } catch (error) {
        next(error);
    }
});

// POST - /api/films - create a new film - PUBLIC
router.post('/', async (req, res, next) => {
    const { title, released, genre, director } = req.body;

    const filmData = {
        title,
        released,
        genre,
        director
    };

    try {
        const film = await createFilm(filmData);

        res.send(film);
    } catch (error) {
        next(error);
    }
});

// PUT - /api/films/:id - update a film by id - PUBLIC
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { title, released, genre, director } = req.body;

    const filmData = {
        title,
        released,
        genre,
        director
    };

    try {
        const film = await updateFilm(id, filmData);

        res.send(film);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/films/:id - delete a film by id - PUBLIC
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const film = await deleteFilm(id);

        res.send(film);
    } catch (error) {
        next(error);
    }
});

module.exports = router;