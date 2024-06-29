const express = require('express');
const router = express.Router();
const InvController = require('../controllers/inventory');

router.get('/', InvController.getAll);

router.get('/:id', InvController.getSingle);

router.post('/', InvController.createInv);

router.put('/:id', InvController.updateInv);

router.delete('/:id', InvController.deleteInv);

module.exports = router;