const games = require('./gamesModel.js');
const db = require('../data/dbConfig.js');

describe('Games Model', () => {
    
    afterEach(async () => {
        await db('games').truncate()
        await db.seed.run()
    });

    it('should get all games', async () => {
        const list = await games.getAll();

        expect(list.length).toBe(1);
    });

    it('should insert new game', async () => {
        const game = await games.insert(
            {
                title: 'Asteroids',
                genre: 'Arcade',
                releaseYear: 1978
            }
        );
        expect(game.length).toBe(1);
    });

});