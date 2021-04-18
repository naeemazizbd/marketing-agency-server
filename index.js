const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
require('dotenv').config();

// App Config
const app = express();

if (app.get('env').toLowerCase() === 'development') {
    app.use(morgan('dev'));
}

//middlewares

const middlewares = [
    cors(),
    express.urlencoded({ extended: true }),
    express.static(path.join(__dirname, 'uploads')),
    express.json({ limit: '15mb' }),
    fileUpload(),
];

app.use(middlewares);

// Import Routes
const serviceRoutes = require('./routes/service');
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/auth');

// Routes Api
app.use('/api/services', serviceRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', userRoutes);

app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to Marking Star',
    });
});

app.use('*', (req, res) => {
    res.status(404).send({
        message: '404 Not Found',
    });
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        next('There is Error from headersSend');
    } else if (err.message) {
        res.status(err.status || 500).send({
            success: false,
            message: err.message,
        });
    } else {
        res.status(500).send({
            success: false,
            message: 'There was an error',
        });
    }
});

const PORT = process.env.PORT || 5000;
const environment = app.get('env');
console.log(environment);

// Server Configuration && Database Connection
app.listen(PORT, () => {
    console.log(
        `SERVER IS RUNNING ON PORT ${PORT} AND SERVER ON MODE ${environment}`
    );
    if (process.env.NODE_ENV === 'production') {
        mongoose.connect(
            // `mongodb+srv://sujoni:sujon1321@marking-star.bbgo7.mongodb.net/marking-star?retryWrites=true&w=majority`,
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@marketingstart.8tzv4.mongodb.net/marketing-star?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            }
        );
        const db = mongoose.connection;
        db.on('connected', () => {
            console.log(`Connected to MongoDB Live ${db.name} Database`);
        });
    } else {
        mongoose
            .connect('mongodb://localhost:27017/marking-star', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            })
            .then(() => {
                console.log('Connected to MongoDB Local Database');
            })
            .catch((err) => console.log(err));
    }
});