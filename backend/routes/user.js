const express = require('express');
const router = express.Router();

const UseController = require('../controllers/user');

router.get('/', UseController.getAll);

router.get('/:id', UseController.getSingle);

module.exports = router;