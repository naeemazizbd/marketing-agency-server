const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
    },
});

const Review = model('Review', reviewSchema);
module.exports = Review;
