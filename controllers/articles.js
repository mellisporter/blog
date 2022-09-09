const express = require('express');
const router = express.Router();

// INDEX

// router.get('/', (req, res) => {
// 	res.render('articles/index.ejs');
// });

router.get('/', (req, res) => {
	Article.find({}, (err, foundArticles) => {
		res.render('articles/index.ejs', {
			articles: foundArticles
		});
	});
});

// NEW

router.get('/new', (req, res) => {
	res.render('articles/new.ejs');
});

// DELETE

router.delete('/:id', (req, res) => {
	Article.findByIdAndRemove(req.params.id, () => {
		res.redirect('/articles');
	});
});

// UPDATE

router.put('/:id', (req, res) => {
	Article.findByIdAndUpdate(req.params.id, req.body, () => {
		res.redirect('/articles');
	});
});

// CREATE

const Article = require('../models/articles.js');
//...
//...farther down the page
router.post('/', (req, res) => {
	Article.create(req.body, (err, createdArticle) => {
		res.redirect('/articles');
	});
});

// EDIT

router.get('/:id/edit', (req, res) => {
	Article.findById(req.params.id, (err, foundArticle) => {
		res.render('articles/edit.ejs', {
			article: foundArticle
		});
	});
});

// SHOW
// avoid this handling /new by placing it towards the bottom of the file
router.get('/:id', (req, res) => {
	Article.findById(req.params.id, (err, foundArticle) => {
		res.render('articles/show.ejs', {
			article: foundArticle
		});
	});
});

module.exports = router;
