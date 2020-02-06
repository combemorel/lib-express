import express from 'express';
import { mySqlConnection } from '../app.js';
import { formatFrontArticle, formatFrontArticleTab } from '../public/javascripts/front.js'
export const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  const limit = 25;
	let page = parseInt(req.query.page)
	let offset = 0;
	let offsetNext = limit;
  
	if (!page || page == 1 ) {
		page = 1
	} else {
    offset = limit*(page-1)
    offsetNext = limit*page ;
  }
  const nextPage = page + 1;
  const previousPage = page - 1;
  const request = `SELECT * from article limit ${limit} offset ${offset};
  SELECT * from article limit ${limit} offset ${offsetNext}; `
  mySqlConnection.query(request, [1, 2], (err, rows, fields) => {
    if (err) throw err;
    if (rows[0].length === 0) {
      res.render('404');
    } else {
      const maxPage = rows[1].length;
      const articles = [];

      for (let i = 0; i < rows[0].length; i++) {
        const element = rows[0][i];
        articles.push(formatFrontArticleTab(element))
      }

      res.render('index', { title: 'LibExpress', subTitle: 'Listes Articles', rows : articles, page : page , previousPage : previousPage , nextPage: nextPage, maxPage: maxPage});
    }
  });
});

indexRouter.get('/article/:id', function(req, res, next) {
	const id = parseInt(req.params.id)
  const edit = parseInt(req.query.edit)

  const request = `SELECT article.*, user.login as author from article left outer join user on article.id_Author = user.id where article.id='${id}';
  SELECT cat.*, rac.id_article from category AS cat LEFT OUTER JOIN r_art_cat AS rac ON cat.id = rac.id_category and rac.id_article = ${id};`;
  mySqlConnection.query(request,
    [1,2],
    (err, rows, fields) => {
      if (err) throw err;
      if (rows[0].length === 0) {
        res.render('404');
      } else {
        console.log(rows[0][0])
        res.render(`articleView`, { title: 'LibExpress', subTitle: 'Article', article: formatFrontArticle(rows[0][0]), categories: rows[1],});
      }
  });
});