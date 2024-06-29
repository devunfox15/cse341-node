const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');
//working  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const getAll = async (req, res) => {
    try {
        const results = await mongodb.getDb().db().collection('stores').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(results);
        }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//working  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error('Must be a valid Inventory ID to get');
        }
        const userId = new ObjectId(req.params.id);
        const results = await mongodb.getDb().db().collection('stores').findOne({ _id: userId });
        if (!results) {
            res.status(404).json({ message: 'Store not found' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(results);
    } catch (err) {
        res.status(400).json(results.error);
    }
};
//working  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const createStore = async (req, res) => {
    const store = {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        email: req.body.email
    };
    try {
        const response = await mongodb
        .getDb()
        .db()
        .collection('stores')
        .insertOne(store);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            throw new Error('Failed to create store');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//working  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const updateStore = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error('Must be a valid Inventory ID to update');
        }
        const userId = new ObjectId(req.params.id);
        const store = {
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phone: req.body.phone,
            email: req.body.email
        };
        const response = await mongodb
        .getDb()
        .db()
        .collection('stores')
        .updateOne({ _id: userId }, { $set: store });
        if (response.modifiedCount > 0) {
            res.status(204).json(response);
        } else {
            throw new Error('Failed to update store');
        }
    } catch (err) {
        res.status(500).json(results.error);
    }
};

const deleteStore = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error('Must be a valid Inventory ID to delete');
        }
        const userId = new ObjectId(req.params.id);
        const response = await mongodb
        .getDb()
        .db()
        .collection('stores')
        .deleteOne({ _id: userId }, true);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            throw new Error('Failed to delete store');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createStore,
    updateStore,
    deleteStore
};