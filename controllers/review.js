const Review = require('../models/Review');

exports.getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({});
        res.status(200).send(reviews);
    } catch (err) {
        next(err);
    }
};

exports.getReview = async (req, res, next) => {
    try {
        res.send({
            message: 'Working',
        });
    } catch (err) {
        next(err);
    }
};

exports.createReview = async (req, res, next) => {
    try {
        console.log(req.body);
        const review = await Review.create(req.body);
        res.status(201).send({
            message: 'Review created successfully',
            data: review,
        });
    } catch (err) {
        next(err);
    }
};

exports.updateReview = async (req, res, next) => {
    try {
        res.send({
            message: 'Working',
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteReview = async (req, res, next) => {
    console.log(req.params);
    try {
        const review = await Review.findOneAndDelete({ _id: req.params.id });
        res.status(200).send({ message: 'Review deleted successfully' });
    } catch (err) {
        next(err);
    }
};
