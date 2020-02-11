import express from 'express';
import { mySqlConnection } from '../app.js';

export const dashboardCategoriesRouter = express.Router();

/* GET All Categories. */
dashboardCategoriesRouter.get('/', function(req, res, next) {
	const limit = 25;
	let page = req.query.page;
	let offset = 0;
	let offsetNext = limit;

	if (!page || page == 1 ) {
		page = 1;
	} else {
    offset = limit*(page-1);
    offsetNext = limit*page ;
  }

  const nextPage = page + 1; // Variables pour les paginations page suivant
  const previousPage = page - 1; // Variables pour les paginations page précédent
  const request = `SELECT * from category limit ${limit} offset ${offset};
  SELECT * from category limit ${limit} offset ${offsetNext};`;
  mySqlConnection.query(request, [1, 2], (err, rows, fields) => {
    if (err) throw err;
    if (rows[0].length === 0) {
      res.render('404');
    } else {
      const maxPage = rows[1].length;
      res.render('categories', { title: 'LibExpress', subTitle: 'Listes Categories', rows : rows[0], page : page , previousPage : previousPage , nextPage: nextPage, maxPage: maxPage});
    }
  });
});