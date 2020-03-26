import express from 'express';
import { mySqlConnection } from '../app.js';

export const categoryRouter = express.Router();

/* GET Create Category. */
categoryRouter.get('/', function(req, res, next) {
    res.render(`category`, { title: 'LibExpress', subTitle: 'Creation de la catégorie' });
});

/* POST Create Category. */
categoryRouter.post('/', (req, res, next) => {
  const { tag } = req.body;
  if (!tag) {
    res.render(`category`, { title: 'LibExpress', subTitle: 'Creation de la catégorie', error: 'Veuillez entrer un nom de Catégorie' });
  }else {
    mySqlConnection.query( `INSERT INTO category (tag) VALUES ('${escape(tag)}');`, (err, rows, fields) => {
      if (err) throw err;
      res.redirect(`/dashboard/categories`);
    });
  }
});

/* GET Udapte Category. */
categoryRouter.get('/:id', function(req, res, next) {
  const id = req.params.id

  mySqlConnection.query(`SELECT * from category where id=${id};`, (err, rows, fields) => {
    if (err) throw err;
    if (rows[0].length === 0) {
        res.render('204');
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
    res.sendStatus(400);
  }else {
    mySqlConnection.query( `UPDATE category SET tag ='${escape(tag)}' WHERE id =${id};`, (err, rows, fields) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  }
});

/* DELETE delete Category. */
categoryRouter.delete('/:id', function(req, res, next) {
  const id = req.params.id
  mySqlConnection.query(`DELETE from category where id= ${id};`, (err, rows, fields) => {
    if (err) throw err;
    res.sendStatus(200);
  })
});
