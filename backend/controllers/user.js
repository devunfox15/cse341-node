const { response } = require('express');
const mongodb = require('../db/connect');
const {ObjectId} = require('mongodb');

const getAll = async (req, res) => {
    //#swagger tags=["User"]
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
    //#swagger tags=["User"]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('user').find({ _id: userId });

    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const createUser = async (req, res) => {
    //#swagger tags=["User"]
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,        
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb
    .getDb()
    .db()
    .collection('user')
    .insertOne(user);
    if (result.acknowledged) {
        res.status(204).json(result);
    }
    else {
        res.status(500).json(result.error || 'Some error occurred while creating the user.');
    }
}; 

const updateUser = async (req, res) => {
    //#swagger tags=["User"]
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb
    .getDb()
    .db()
    .collection('user')
    .updateOne({ _id: userId }, { $set: user });
    if (result.modifiedCount > 0) {
        res.status(204).json(result);
    }
    else {
        res.status(500).json(result.error || 'Some error occurred while updating the user.');
    }
}; 

const deleteUser = async (req, res) => {
    //#swagger tags=["User"]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db()
    .collection('user')
    .deleteOne({ _id: userId }, true);
    if (result.deletedCount > 0) {
        res.status(204).json(result);
    }
    else {
        res.status(500).json(result.error || 'Some error occurred while deleting the user.');
    }
};

module.exports = {
    getAll,
    getSingle,
    updateUser,
    createUser,
    deleteUser
}