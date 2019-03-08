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
});