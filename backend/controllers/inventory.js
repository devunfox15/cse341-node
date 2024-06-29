const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

//working  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const getAll = async (req, res) => {
    try {
        const lists = await mongodb.getDb().db().collection('inventory').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//working  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error('Must be a valid ID to get');
        }
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('inventory').findOne({ _id: userId });
        if (!result) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
//working  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const createInv = async (req, res) => {
    const inv = {
        name: req.body.name,
        product: req.body.product,
        price: req.body.price,
        size: req.body.size,
        brand: req.body.brand,
        color: req.body.color,
        quantity: req.body.quantity
    };
    try {
        const response = await mongodb.getDb().db().collection('inventory').insertOne(inv);
        
        if (response.acknowledged) {

            res.status(201).json(response);
        } else {

            throw new Error('Failed to create item');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//working  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const updateInv = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error('Must be a valid ID to update');
        }
        const userId = new ObjectId(req.params.id);
        const inv = {
            name: req.body.name,
            product: req.body.product,
            price: req.body.price,
            size: req.body.size,
            brand: req.body.brand,
            color: req.body.color,
            quantity: req.body.quantity
        };
        const response = await mongodb
        .getDb()
        .db()
        .collection('inventory')
        .replaceOne({ _id: userId }, inv);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            throw new Error('Failed to update item');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deleteInv = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error('Must be a valid ID to delete');
        }
        const userId = new ObjectId(req.params.id);
        const response = await mongodb
        .getDb()
        .db()
        .collection('inventory')
        .deleteOne({ _id: userId }, true);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            throw new Error('Failed to delete item');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createInv,
    updateInv,
    deleteInv
};