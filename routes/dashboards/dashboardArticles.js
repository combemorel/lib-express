import express from 'express';
import { mySqlConnection } from '../../app.js';
import { formatArticleTab } from '../../functions/formatArticle.js';

export const dashboardArticleRouter = express.Router();

/* GET All Articles. */
dashboardArticleRouter.get('/', function(req, res, next) {
  const id_cat = 0;
  const limit = 25;// Limit du nombre d'article afficher par page à 25
  let page = parseInt(req.query.page); // Parametre inserer apres un "?" dans l'URL
  let offset = 0; // Variables de décalage requete SQL
	if (!page || page == 1 ) { // Si Variable page null ou égale 1
    page = 1;
	} else { // Sinon
    offset = limit*(page-1);
  }
  const nextPage = page + 1; // Variables pour les paginations page suivant
  const previousPage = page - 1; // Variables pour les paginations page précédent
  // Requete SQL
  const request = `SELECT * from article limit ${limit} offset ${offset};
  SELECT COUNT(id) as count from article;
  SELECT * from category; `;
  // Envoye de la Requete SQL
  mySqlConnection.query(request, [1, 2, 3], (err, rows, fields) => {
    if (err) throw err; // Si requete est fausse
    if (rows[0].length === 0) {// Si la requete ne renvoye rien
      res.render('404');
    } else { // sinon
      const count = rows[1][0].count; // Constante pour vérifier si il y a des articles a afficher
      const articles = [];
      const categories = [];

      for (let i = 0; i < rows[0].length; i++) {
        const element = rows[0][i];
        articles.push(formatArticleTab(element));
      }
      for (let i = 0; i < rows[2].length; i++) {
        const element = rows[2][i];
        categories.push(element);
      }
      res.render('dashboards/dashboardArticles', { title: 'LibExpress', subTitle: 'Listes Articles', rows : articles, page : page , previousPage : previousPage , nextPage: nextPage, count: count, limit: limit, categories: categories,id_cat: id_cat});
    }
  });
});


/* GET All Articles. */
dashboardArticleRouter.get('/cat/:category', function(req, res, next) {
  const id = parseInt(req.params.category);

  const limit = 25;// Limit du nombre d'article afficher par page à 25
  let page = parseInt(req.query.page); // Parametre inserer apres un "?" dans l'URL
  let offset = 0; // Variables de décalage requete SQL
	if (!page || page == 1 ) { // Si Variable page null ou égale 1
    page = 1;
	} else { // Sinon
    offset = limit*(page-1);
  }
  const nextPage = page + 1; // Variables pour les paginations page suivant
  const previousPage = page - 1; // Variables pour les paginations page précédent
  // Requete SQL
  const request = `SELECT article.* from article left outer join r_art_cat AS rac ON  rac.id_article = article.id where rac.id_category =${id} limit ${limit} offset ${offset};
  SELECT COUNT(article.id) as count from article left outer join r_art_cat AS rac ON  rac.id_article = article.id where rac.id_category =${id};
  SELECT * from category; `;
  // Envoye de la Requete SQL
  mySqlConnection.query(request, [1, 2, 3], (err, rows, fields) => {
    if (err) throw err; // Si requete est fausse

    const count = rows[1][0].count; // Constante pour vérifier si il y a des articles a afficher
    const articles = [];
    const categories = [];

    for (let i = 0; i < rows[0].length; i++) {
      const element = rows[0][i];
      articles.push(formatArticleTab(element));
    }
    for (let i = 0; i < rows[2].length; i++) {
      const element = rows[2][i];
      categories.push(element);
    }
    res.render('dashboards/dashboardArticles', { title: 'LibExpress', subTitle: 'Listes Articles', rows : articles, page : page , previousPage : previousPage , nextPage: nextPage, count: count, limit: limit, categories: categories, id_cat: id});

  });
});

