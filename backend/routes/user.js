const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/', UserController.getAll);
router.get('/:id', UserController.getSingle);

module.exports = router;