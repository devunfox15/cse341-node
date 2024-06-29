const express = require('express');
const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/inventory', require('./inventory'));

router.use('/stores', require('./stores'));

module.exports = router;