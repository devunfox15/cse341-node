const mongodb = require('../db/connect');
const {ObjectId} = require('mongodb');

const getAll = async (req, res) => {
    const result = await mongodb
    .getDb()
    .db()
    .collection('user')
    .find();

    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('user').find({ _id: userId });

    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

module.exports = {
    getAll,
    getSingle,
}