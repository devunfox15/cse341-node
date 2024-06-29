const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/stores');

router.get('/', StoreController.getAll);

router.get('/:id', StoreController.getSingle);

router.post('/', StoreController.createStore);

router.put('/:id', StoreController.updateStore);

router.delete('/:id', StoreController.deleteStore);

module.exports = router;