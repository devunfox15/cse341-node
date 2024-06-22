const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/', UserController.getAll);

router.get('/:id', UserController.getSingle);

router.post('/', UserController.createUser);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

module.exports = router;