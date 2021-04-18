const { body } = require('express-validator');

const serviceValidator = [
    body('title').not().isEmpty().withMessage('Service Title is required.'),
    body('price')
        .not()
        .isEmpty()
        .withMessage('Service price is required.')
        .isNumeric()
        .withMessage('Service price must be numeric.'),

    body('description').not().isEmpty().withMessage('description is required.'),
];

module.exports = serviceValidator;
