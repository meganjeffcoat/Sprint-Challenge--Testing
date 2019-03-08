const db = require('../data/dbConfig.js');

module.exports = {
    getAll: () => {
        return db('games');
    },

    findById: (id) => {
        return db('games').where({ id }).first();
    },

    insert: (game) => {
        return db('games').insert(game).into('games');
    },

    remove: (id) => {
        return db('games').where({ id }, id).del(id);
    }


};

