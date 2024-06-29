const express = require('express');
const router = express.Router();
const InvController = require('../controllers/inventory');
const {inventoryValidationRules, validate} = require('../middleware/validation');

router.get('/', InvController.getAll);

router.get('/:id', InvController.getSingle);

router.post('/', inventoryValidationRules(), validate, InvController.createInv);

router.put('/:id', inventoryValidationRules(), validate, InvController.updateInv);

router.delete('/:id', InvController.deleteInv);

module.exports = router;