const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 11);
    }
    next();
});

userSchema.methods.getToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            type: this.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    );
};

const User = model('User', userSchema);

module.exports = User;
