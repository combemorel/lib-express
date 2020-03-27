import express from 'express';
import createError from 'http-errors';
import { mySqlConnection } from '../app.js';
import { formatFrontArticle, formatFrontArticleTab } from '../functions/formatArticle.js';

export const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  const id_cat = 0;
  const limit = 25;
	let page = parseInt(req.query.page);
	let offset = 0;

	if (!page || page == 1 ) {
		page = 1;
	} else {
    offset = limit*(page-1);
  }
  const nextPage = page + 1;
  const previousPage = page - 1;
  const request = `SELECT * from article limit ${limit} offset ${offset};
  SELECT COUNT(id) as count from article;
  SELECT * from category; `;
  mySqlConnection.query(request, [1, 2, 3], (err, rows, fields) => {
    if (err) throw err;
    if (rows[0].length === 0) {
      res.render('204');
    } else {
      const count = rows[1][0].count;
      const articles = [];
      const categories = [];

      for (let i = 0; i < rows[0].length; i++) {
        const element = rows[0][i];
        articles.push(formatFrontArticleTab(element));
      }

      for (let i = 0; i < rows[2].length; i++) {
        const element = rows[2][i];
        categories.push(element);
      }
      res.render('index', { title: 'LibExpress', subTitle: 'Listes Articles', rows: articles, page: page , previousPage: previousPage , nextPage: nextPage, count: count, limit: limit, categories: categories, id_cat: id_cat});
    }
  });
});

/* GET Article */
indexRouter.get('/article/:id', function(req, res, next) {
	const id = parseInt(req.params.id);

  const request = `SELECT article.*, user.login as author from article left outer join user on article.id_Author = user.id where article.id='${id}';
  SELECT cat.*, rac.id_article from category AS cat LEFT OUTER JOIN r_art_cat AS rac ON cat.id = rac.id_category and rac.id_article = ${id};`;
  mySqlConnection.query(request, [1,2], (err, rows, fields) => {
    if (err) throw err;
    if (rows[0].length === 0) {
      res.render('204');
    } else {
      res.render(`articleView`, { title: 'LibExpress', subTitle: 'Article', article: formatFrontArticle(rows[0][0]), categories: rows[1],});
    }
  });
});


/* GET home page filtre category. */
indexRouter.get('/cat/:category', function(req, res, next) {
  console.log('filtre');
  const id = parseInt(req.params.category);

  const limit = 25;
	let page = parseInt(req.query.page);
	let offset = 0;

	if (!page || page == 1 ) {
		page = 1;
	} else {
    offset = limit*(page-1);
  }
  const nextPage = page + 1;
  const previousPage = page - 1;
  const request = `SELECT article.* from article left outer join r_art_cat AS rac ON  rac.id_article = article.id where rac.id_category =${id} limit ${limit} offset ${offset};
  SELECT COUNT(article.id) as count from article left outer join r_art_cat AS rac ON  rac.id_article = article.id where rac.id_category =${id};
  SELECT * from category; `
  mySqlConnection.query(request, [1, 2, 3], (err, rows, fields) => {
    if (err) throw err;
    const count = rows[1][0].count;
    const articles = [];
    const categories = [];
    for (let i = 0; i < rows[0].length; i++) {
      const element = rows[0][i];
      articles.push(formatFrontArticleTab(element));
    }
    for (let i = 0; i < rows[2].length; i++) {
      const element = rows[2][i];
      categories.push(element);
    }
    res.render('index', { title: 'LibExpress', subTitle: 'Listes Articles', rows: articles, page: page , previousPage: previousPage , nextPage: nextPage, count: count, limit: limit, categories: categories, id_cat: id});
  });
});
