
const express = require('express');
const router = express.Router();
const Author = require('../models/authors.js');


// must come before the router

module.exports = router;

// InDEX

router.get('/', (req, res) => {
    Author.find({}, (err, foundAuthors) => {
        res.render('authors/index.ejs', {
            authors: foundAuthors
        });
    })
});


// NEW

router.get('/new', (req, res) => {
    res.render('authors/new.ejs');
});

// DELETE

router.delete('/:id', (req, res) => {
    Author.findByIdAndRemove(req.params.id, () => {
        res.redirect('/authors');
    });
});

// UPDATE


router.put('/:id', (req, res) => {
    Author.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect('/authors');
    });
});

// CREATE

router.post('/', (req, res) => {
    Author.create(req.body, (err, createdAuthor) => {
        res.redirect('/authors');
    });
});

// EDIT

router.get('/:id/edit', (req, res) => {
    Author.findById(req.params.id, (err, foundAuthor) => {
        res.render('authors/edit.ejs', {
            author: foundAuthor
        });
    });
});

// SHOW


//avoid this handling /new by placing it towards the bottom of the file
router.get('/:id', (req, res) => {
    Author.findById(req.params.id, (err, foundAuthor) => {
        res.render('authors/show.ejs', {
            author: foundAuthor
        });
    });
});



