const { body } = require('express-validator');
const User = require('../models/Auth');

exports.registrationValidator = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('First Name is required.')
        .isLength({ min: 2, max: 56 })
        .withMessage('First Name Must 2 t0 56 chracters')
        .trim(),
    body('email')
        .isEmail()
        .withMessage('Please Provide a valid Email Address.')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                return Promise.reject('E-mail already in use');
            }
            return true;
        })
        .normalizeEmail(),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];
