import express from 'express';
import { mySqlConnection } from '../../app.js';
import { formatArticleTab } from '../../functions/formatArticle.js';

export const dashboardArticleRouter = express.Router();

/* GET All Articles. */
dashboardArticleRouter.get('/', function(req, res, next) {
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
  SELECT COUNT(id) as count from article;`;
  // Envoye de la Requete SQL
  mySqlConnection.query(request, [1, 2], (err, rows, fields) => {
    if (err) throw err; // Si requete est fausse
    if (rows[0].length === 0) {// Si la requete ne renvoye rien
      res.render('404');
    } else { // sinon
      const count = rows[1][0].count; // Constante pour vérifier si il y a des articles a afficher
      const articles = [];

      for (let i = 0; i < rows[0].length; i++) {
        const element = rows[0][i];
        articles.push(formatArticleTab(element));
      }
      res.render('dashboards/dashboardArticles', { title: 'LibExpress', subTitle: 'Listes Articles', rows : articles, page : page , previousPage : previousPage , nextPage: nextPage, count: count, limit: limit});
    }
  });
});


