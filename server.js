const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const authorsController = require('./controllers/authors.js');
const methodOverride = require('method-override');


// // Database Configuration
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// MIDDLEWARE


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

const articlesController = require('./controllers/articles.js');
app.use('/articles', articlesController);



// CONTROLLER

app.use('/authors', authorsController);

app.get('/', (req, res) => {
    res.render('index.ejs');
});


// LISTENER

app.listen(3000, () => {
    console.log('listening....');
});