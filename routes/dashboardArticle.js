import express from 'express';
import { mySqlConnection } from '../app.js';

export const dashboardRouter = express.Router();

/* GET home page. */
dashboardRouter.get('/', function(req, res, next) {
  const limit = 25;// Limit du nombre d'article afficher par page à 25
  let page = parseInt(req.query.page) // Parametre inserer apres un "?" dans l'URL
  let offset; // Variables de décalage requete SQL
  let offsetNext; // Variables pour verifier si il y a des enregistrements apres
	if (!page || page == 1 ) { // Si Variable page null ou égale 1
    page = 1
    offset = 0;
    offsetNext = limit;
	} else { // Sinon
    offset = limit*(page-1)
    offsetNext = limit*page ;
  }
  const nextPage = page + 1; // Variables pour les paginations page suivant
  const previousPage = page - 1; // Variables pour les paginations page précédent
  // Requete SQL
  const request = `SELECT * from article limit ${limit} offset ${offset};
  SELECT * from article limit 1 offset ${offsetNext}; `;
  // Envoye de la Requete SQL
  mySqlConnection.query(request, [1, 2], (err, rows, fields) => {
    if (err) throw err; // Si requete est fausse
    if (rows[0].length === 0) {// Si la requete ne renvoye rien
      res.render('404');
    } else { // sinon
      const maxPage = rows[1].length; // Constante pour vérifier si il y a des articles a afficher
      res.render('dashboardArticle', { title: 'LibExpress', subTitle: 'Listes Articles', rows : rows[0], page : page , previousPage : previousPage , nextPage: nextPage, maxPage: maxPage});
    }
  });

});


