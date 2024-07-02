const router = require('express').Router();
const passport = require('passport'); // works with this here... maybe

router.use('/api-docs', require('./swagger'));
router.use('/inventory', require('./inventory'));
router.use('/stores', require('./stores'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;