const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/stores');
const {retailerValidationRules, validate} = require('../middleware/validation');
const {isAuthenticated} = require('../middleware/authenticate');


router.get('/', StoreController.getAll);

router.get('/:id', StoreController.getSingle);

router.post('/', isAuthenticated,retailerValidationRules(), validate, StoreController.createStore);

router.put('/:id', isAuthenticated,retailerValidationRules(), validate, StoreController.updateStore);

router.delete('/:id', isAuthenticated, StoreController.deleteStore);

module.exports = router;