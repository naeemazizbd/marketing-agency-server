const Service = require('../models/Service');
const { validationResult } = require('express-validator');
const path = require('path');

exports.getServices = async (req, res, next) => {
    try {
        const services = await Service.find({});
        res.status(200).send({
            data: services,
        });
    } catch (err) {
        next(err);
    }
};

exports.getService = async (req, res, next) => {
    try {
        const service = await Service.findOne({ _id: req.params.id });
        res.status(200).send({
            data: service,
        });
    } catch (err) {
        next(err);
    }
};

exports.createService = async (req, res, next) => {
    try {
        console.log(req.body);

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

        const service = await Service.create({
            ...req.body,
            image: fileName,
        });

        return res.status(201).send({
            message: 'service create successfully!',
            data: service,
        });
    } catch (err) {
        next(err);
    }
};

exports.updateService = async (req, res, next) => {
    try {
        const service = await Service.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                },
            },
            {
                new: true,
            }
        );
        res.status(200).send({
            message: 'Service Updated Successfully',
            data: service,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteService = async (req, res, next) => {
    try {
        const service = await Service.findOneAndDelete({ _id: req.params.id });
        res.status(200).send({
            message: 'Service Delete Successfully',
        });
    } catch (err) {
        next(err);
    }
};
