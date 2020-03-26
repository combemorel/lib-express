import express from 'express';
import { mySqlConnection } from '../app.js';
import { formatArticle } from '../functions/formatArticle.js';

export const articleRouter = express.Router();

/* GET Create Article . */
articleRouter.get('/', function (req, res, next) {
  mySqlConnection.query(`SELECT * from category`, (err, rows, fields) => {
    if (err) throw err;
    res.render('article', { title: 'LibExpress', subTitle: `Création d\'un article`, categories: rows });
  })
});


/* POST Create Article . */
articleRouter.post('/', (req, res, next) => {
  const { title, content, categories } = req.body;
  if (!title || !content) {
    mySqlConnection.query(`SELECT * from category`, (err, rows, fields) => {
      if (err) throw err;
      res.render('article', { title: 'LibExpress', subTitle: `Création d\'un article`, categories: rows, error: 'Veuillez entrer un titre et un contenue'});
    });
  } else {
    let sqlCat = "";
    for (let i = 0; i < categories.length; i++) {
      const element = categories[i];
      sqlCat += `INSERT INTO r_art_cat (id_article,id_category) VALUES (@lastId,${element});`;
    }
    const request = `INSERT INTO article (title, content,date,id_author) VALUES ('${escape(title)}', '${escape(content)}',NOW(),2);
      SET @lastId = LAST_INSERT_ID();${sqlCat}`;
    mySqlConnection.query(request, (err, rows, fields) => {
        if (err) throw err;
        res.redirect(`/dashboard`);
      }
    );
  }
});

/* GET Update Article . */
articleRouter.get('/:id', function (req, res, next) {
  const id = parseInt(req.params.id);
  const edit = parseInt(req.query.edit);
  const request = `SELECT * from article where id='${id}';
  SELECT cat.*, rac.id_article from category AS cat LEFT OUTER JOIN r_art_cat AS rac ON cat.id = rac.id_category and rac.id_article = ${id};`;
  mySqlConnection.query(request, [1, 2], (err, rows, fields) => {
    if (err) throw err;
    if (rows[0].length === 0) {
      res.render('204');
    } else {
      res.render(`article`, { title: 'LibExpress', subTitle: 'Modification d\'un article', article: formatArticle(rows[0][0]), categories: rows[1] });
    }
  });
});

/* PUT Update Article . */
articleRouter.put('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const { title, content, categoriesSelect } = req.body;
  if (!title || !content) {
    res.sendStatus(400);
  } else {
    let sqlCat = `DELETE FROM r_art_cat WHERE id_article = ${id};`;
    categoriesSelect.forEach(element => {
      sqlCat += `INSERT INTO r_art_cat (id_article, id_category) VALUE (${id}, ${element});`
    });
    const request = `UPDATE article SET title = '${escape(title)}', content = '${escape(content)}' WHERE id = ${id}; ` + sqlCat;
    mySqlConnection.query( request, (err, rows, fields) => {
        if (err) throw err;
        res.sendStatus(200);
      }
    );
  }
});

/* DELETE Delete Article . */
articleRouter.delete('/:id', function (req, res, next) {
  const id = parseInt(req.params.id);
  mySqlConnection.query(`DELETE from article where id=${id};`, (err, rows, fields) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});