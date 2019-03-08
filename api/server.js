const express = require('express');

const games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/games', async (req, res) => {
    try {
        const game = await games.getAll();
        res.status(200).json(game);
    } catch (err) {
        res.status(500).json({ error: 'No games available'});
    }
});

server.post('/games', async (req, res) => {
    try {
        const gameData = req.body;
        if (gameData.title && gameData.genre) {
            const count = await games.insert(gameData);
            res.status(201).json(count);
        } else {
            res.status(422).json({ error: 'You are missing info' });
        }
    } catch(err) {
        res.status(500).json({ error: 'No games available' });
    }
});

server.delete('/games/:id', async (req, res) => {
    try {
        const count = await games.remove(req.params.id);
        res.status(200).json({ message: 'game deleted', count});
    } catch (err) {
        res.status(500).json(err)
    }
})




module.exports = server;