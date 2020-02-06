import express from 'express';
import { mySqlConnection } from '../app.js';

export const dashbordCategoryRouter = express.Router();

/* GET home page. */
dashbordCategoryRouter.get('/', function(req, res, next) {
	const limit = 25;
	let page = req.query.page
	let offset = 0;
	let offsetNext = limit;

	if (!page || page == 1 ) {
		page = 1
	} else {
    offset = limit*(page-1)
    offsetNext = limit*page ;
	}
  const nextPage = ++page;
  const previousPage = page - 2;
  const request = `SELECT * from category limit ${limit} offset ${offset};
  SELECT * from category limit ${limit} offset ${offsetNext}; `
  mySqlConnection.query(request, [1, 2], (err, rows, fields) => {
    if (err) throw err;
    if (rows[0].length === 0) {
      res.render('404');
    } else {
      const maxPage = rows[1].length;
      console.log(maxPage)
      res.render('dashboardCategory', { title: 'LibExpress', subTitle: 'Listes Categories', rows : rows[0], page : page , previousPage : previousPage , nextPage: nextPage, maxPage: maxPage});
    }
  });
});

dashbordCategoryRouter.post('/', (req, res, next) => {
  const { tag } = req.body;
  if (!tag) {
    res.status = 400;
    res.end();
    return;
  }

  mySqlConnection.query(
    `INSERT INTO category (tag) VALUES ('${escape(tag)}');`,
    (err, rows, fields) => {
      if (err) throw err;
      res.redirect(`/dashboard/categories`);
    }
  );
});


dashbordCategoryRouter.get('/:id', function(req, res, next) {
	const id = req.params.id

	mySqlConnection.query(`SELECT * from category where id= ${id};`,
		(err, rows, fields) => {
			if (err) throw err;
			if (rows[0].length === 0) {
				res.render('404');
			} else {
				res.render(`category`, { title: 'LibExpress', subTitle: 'Modification de la catégorie', category: rows[0] });
			}
  });
});

dashbordCategoryRouter.delete('/:id', function(req, res, next) {
	const id = req.params.id
	mySqlConnection.query(`DELETE from category where id= ${id};`,
		(err, rows, fields) => {
			if (err) throw err;
			if (rows.length === 0) {
				res.render('404');
			} else {
				res.sendStatus(200)
			}
  });
});

dashbordCategoryRouter.put('/:id', (req, res, next) => {
  const id = req.params.id
  const { tag } = req.body;
  if (!tag) {
    res.status = 400;
    res.end();
    return;
  }
  mySqlConnection.query(
    `UPDATE category SET tag = '${escape(tag)}' WHERE id = ${id};`,
    (err, rows, fields) => {
			if (err) throw err;
        res.sendStatus(200)
    }
  );
});