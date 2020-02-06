import express from 'express';
import bcrypt from 'bcrypt';
import { mySqlConnection } from '../app.js';

export const loginRouter = express.Router();

// Routes GET pour la Connexion
loginRouter.get('/', function (req, res, next) {
  if (req.query.invalid) {
    res.render('login', {
      title: 'LibExpress',
      subTitle: 'Connexion',
      error: 'Identifiants Incorrect'
    });
  } else if (req.query.reset) {
    const request = `SELECT * from user where login='admin' AND id=2;`
    // Envoye de la Requete SQL
    mySqlConnection.query(request, (err, rows, fields) => {
      if (err) throw err; // Si requete est fausse
      if (rows.length === 0) { // Si la requete ne renvoye rien
        res.status = 400
      } else { // Sinon
        console.log('user ' + rows[0])
        res.render('login', {
          title: 'LibExpress',
          subTitle: 'Modification Mot de Passe',
          user: rows[0]
        });
      }
    });
  } else {
    res.render('login', {
      title: 'LibExpress',
      subTitle: 'Connexion'
    });
  }

})

// Route POST pour la Connexion
loginRouter.post('/', function (req, res, next) {
  console.log('post')
	const { login, pwd } = req.body; //Récupération des donnees du formulaire

  if (!login || !pwd) { // Si donnees vides
    res.sendStatus(400)
	}
  // Requete SQL
  const request = `SELECT login, password from user where login='admin' AND id=2;`
  // Envoye de la Requete SQL
  mySqlConnection.query(request, (err, rows, fields) => {
    if (err) throw err; // Si requete est fausse
    if (rows.length === 0) { // Si la requete ne renvoye rien
      res.sendStatus(400)
    } else { // Sinon
			bcrypt.compare(pwd, rows[0].password).then(function(result) {
				if(result) {
					res.sendStatus(200)
				} else {
					res.sendStatus(401)
				}
			});

    }
	});

});

loginRouter.put('/:id', (req, res, next) => {
	const saltRounds = 10;
	const id = parseInt(req.params.id)
	const { pwd } = req.body;
	if (!pwd) {
		res.status = 400;
		res.end();
		return;
	}
	bcrypt.hash(pwd, saltRounds).then(function (hash) {
		const request = `UPDATE user SET password = '${hash}' WHERE id=${id} AND login='admin';`

		mySqlConnection.query(
			request,
			(err, rows, fields) => {
				if (err) throw err;
				res.sendStatus(200)
			}
		);
	});
});
