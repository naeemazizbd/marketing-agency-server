const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('../models/Auth');

exports.registration = async (req, res, next) => {
    try {
        const errors = validationResult(req).formatWith((err) => err.msg);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.mapped());
        }

        const file = req.files;
        const fileExt = path.extname(file.image.name);
        const fileName =
            file.image.name
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-') +
            '-' +
            Date.now() +
            fileExt;

        file.image.mv(`${__dirname}/../uploads/${fileName}`, (err) => {
            if (err) {
                return res
                    .status(500)
                    .send({ message: 'Image 1 could not be uploaded' });
            }
        });

        const user = await User.create({
            ...req.body,
            image: fileName,
        });
        res.send({
            message: 'Registration Success!',
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('-password -__v');

        if (!user) {
            return res.status(400).send({ message: 'Invalid Credentials' });
        }

        const isMatchPassword = bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(400).send({ message: 'Invalid Credentials' });
        }
        const token = user.getToken();

        res.status(200).send({
            message: 'Login Successful',
            data: user,
            token,
        });
    } catch (err) {
        console.log(err);
    }
};
