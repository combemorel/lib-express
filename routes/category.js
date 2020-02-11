import express from 'express';
import { mySqlConnection } from '../app.js';

export const categoryRouter = express.Router();

/* GET Craete Category. */
categoryRouter.get('/', function(req, res, next) {
    res.render(`category`, { title: 'LibExpress', subTitle: 'Creation de la catégorie' });
});

/* POST Create Category. */
categoryRouter.post('/', (req, res, next) => {
  const { tag } = req.body;
  if (!tag) {
    res.status = 400;
    res.end();
    return;
  }
  mySqlConnection.query( `INSERT INTO category (tag) VALUES ('${escape(tag)}');`, (err, rows, fields) => {
    if (err) throw err;
    res.redirect(`/dashboard/categories`);
  });
});

/* GET Udapte Category. */
categoryRouter.get('/:id', function(req, res, next) {
  const id = req.params.id

  mySqlConnection.query(`SELECT * from category where id= ${id};`, (err, rows, fields) => {
    if (err) throw err;
    if (rows[0].length === 0) {
        res.render('404');
    } else {
        res.render(`category`, { title: 'LibExpress', subTitle: 'Modification de la catégorie', category: rows[0] });
    }
  });
});

/* PUT Udapte Category. */
categoryRouter.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { tag } = req.body;
  if (!tag) {
    res.status = 400;
    res.end();
    return;
  }
  mySqlConnection.query( `UPDATE category SET tag = '${escape(tag)}' WHERE id = ${id};`, (err, rows, fields) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

/* DELETE delete Category. */
categoryRouter.delete('/:id', function(req, res, next) {
    const id = req.params.id
    mySqlConnection.query(`DELETE from category where id= ${id};`, (err, rows, fields) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.render('404');
    } else {
      res.sendStatus(200);
    }
  });
});