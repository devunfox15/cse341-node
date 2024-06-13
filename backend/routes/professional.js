const express = require('express');
const professionalController = require('../controllers/professional.js');

const router = express.Router();

// GET /feed/posts
router.get('/', professionalController.getData);
// localhost:8080/professional/
module.exports = router;