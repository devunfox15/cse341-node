const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/stores');
const {retailerValidationRules, validate} = require('../middleware/validation');


router.get('/', StoreController.getAll);

router.get('/:id', StoreController.getSingle);

router.post('/',retailerValidationRules(), validate, StoreController.createStore);

router.put('/:id',retailerValidationRules(), validate, StoreController.updateStore);

router.delete('/:id', StoreController.deleteStore);

module.exports = router;