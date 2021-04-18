const { Schema, model } = require('mongoose');

const serviceSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Service = model('Service', serviceSchema);

module.exports = Service;
