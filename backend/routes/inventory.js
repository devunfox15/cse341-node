const express = require('express');
const router = express.Router();
const InvController = require('../controllers/inventory');
const {inventoryValidationRules, validate} = require('../middleware/validation');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', InvController.getAll);

router.get('/:id', InvController.getSingle);

router.post('/', isAuthenticated, inventoryValidationRules(), validate, InvController.createInv);

router.put('/:id', isAuthenticated, inventoryValidationRules(), validate, InvController.updateInv);

router.delete('/:id', isAuthenticated, InvController.deleteInv);

module.exports = router;