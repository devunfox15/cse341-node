const {body, validationResult } = require('express-validator');

//{"name": "Slim Fit Jeans","product": "Jeans","price": 39.99,
//"size": "M","brand": "Levi's","color": "Blue","quantity": 11 }
const inventoryValidationRules = () => {
    return [
        body('name').isAlpha({ ignore: ' ' }).not().isEmpty(),
        body('product').isAlpha({ ignore: ' ' }).not().isEmpty(),
        body('price').isFloat().not().isEmpty(),
        body('size').isAlpha({ ignore: ' ' }).not().isEmpty(),
        body('brand').isAlpha({ ignore: ' ' }).not().isEmpty(),
        body('color').isAlpha({ ignore: ' ' }).not().isEmpty(),
        body('quantity').isInt()
    ]
};

// "name": "Jane Smith","address": "456 Elm Avenue","city": "Sometown","state": "NY", "zip": "54321","phone": "555-987-6543","email": "jane.smith@example.com"
const retailerValidationRules = () => {
    return [
        body('name').isAlpha({ ignore: ' ' }).not().isEmpty(),
        body('address').isAlpha({ ignore: ' ' }).not().isEmpty(),
        body('city').isAlpha({ ignore: ' ' }).not().isEmpty(),
        body('state').isAlpha({ ignore: ' ' }).not().isEmpty(),
        body('zip').isNumeric().not().isEmpty(),
        body('phone').isNumeric().not().isEmpty(),
        body('email').isEmail().not().isEmpty(),
    ]
};

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    return res.status(422).json({
        errors: extractedErrors,
    })
}
    module.exports = {
    inventoryValidationRules,
    retailerValidationRules,
    validate,
}
