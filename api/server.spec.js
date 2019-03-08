const request = require('supertest');

const server = require('./server.js');
const db = require('../data/dbConfig.js'); 

describe('route handlers', () => {
    
    afterEach( async () => {
        await db('games').truncate();
    });

    describe('GET /games', () => {
        
        it('response with 200', async () => {
            const res = await request(server).get('/games');

            expect(res.status).toBe(200);
        });

        it('should return JSON', async () => {
            const res = await request(server).get('/games');

            expect(res.type).toBe('application/json');
        });

        it('sends correct response object', async () => {
            const res = await request(server).get('/games');

            expect(res.body).toEqual([]);
        });
    });

    describe('POST /games', () => {

        it('should make a post to /games ', async () => {
            game = {
                title: 'Donkey Kong Jr',
                genre: 'Platformer',
                releaseYear: 1982
            }
            const res = await request(server).post('/games').send(game);

            expect(res.body.games[0]).toEqual(game);
        });
        
        it('responds with 201 when body is correct', async () => {
            const body = { title: 'Donkey Kong', genre: 'Platformer' };
            const res = await request(server).post('/games').send(body);

            expect(res.status).toBe(201);
        });

        it('responds with 422 when body is missing data', async () => {
            const body = {};
            const res = await request(server).post('/games').send(body);

            expect(res.status).toBe(422);
        });
    });
});