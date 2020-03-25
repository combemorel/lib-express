import express from 'express';
import bcrypt from 'bcrypt';
import { mySqlConnection } from '../app.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { authenticated } from '../functions/authenticate.js';
import createHttpError from 'http-errors';

export const loginRouter = express.Router();

/* ----------------------- GET Login ----------------------- */
loginRouter.get('/', function (req, res, next) {
  res.render('login', { title: 'LibExpress', subTitle: 'Connexion' });
})


/* ----------------------- GET Update Login ----------------------- */
loginRouter.get('/change', authenticated, function (req, res, next) {
  const request = `SELECT * from user where login='admin' AND id=2;`;
  // Envoye de la Requete SQL
  mySqlConnection.query(request, (err, rows, fields) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.status = 400;
    } else { // Sinon
      res.render('login', { title: 'LibExpress', subTitle: 'Modification Mot de Passe', user: rows[0] });
    }
  });
})


/* ----------------------- POST login ----------------------- */
loginRouter.post('/', function (req, res, next) {
	const { login, pwd } = req.body; //Récupération des donnees du formulaire
  if (!login || !pwd) { // Si donnees vides
    res.sendStatus(400);
  }
  
  // Requete SQL
  const request = `SELECT login, password from user where login='${login}' AND id=2;`;
  // Envoye de la Requete SQL
  mySqlConnection.query(request, (err, rows, fields) => {
    if (err) throw err; // Si requete est fausse
    if (rows.length === 0) { // Si la requete ne renvoye rien
      res.sendStatus(400);
    } else { // Sinon
      req.pwd = pwd;
      req.login = login;
      req.encodedPwd = rows[0].password;
      next();
    }
	});
}, (req,res,next)=>{
  bcrypt.compare(req.pwd,req.encodedPwd ).then( result => {
    if(result) {
      let token = jwt.sign({ "user": req.login }, 'hjghroegrjioghreog,;://.,k,kgrgsgspoi', { algorithm: 'HS256'});

      res.cookie('auth', token,{ maxAge: 900000 });
      res.sendStatus(200);
    }
    else{
      res.sendStatus(401);
    }
  });
} );


/* ----------------------- PUT Update Login ----------------------- */
loginRouter.put('/:id',authenticated , (req, res, next) => {
  const id = parseInt(req.params.id);
  const { pwd } = req.body;
	if (!pwd) {
		res.status = 400;
		res.end();
		return;
  }

  req.pwd = pwd;
  req.id = id;
  next();
}, (req,res)=>{

  bcrypt.hash(pwd, 10).then(function (hash) {
    console.log(pwd)
		const request = `UPDATE user SET password = '${hash}' WHERE id=${id} AND login='admin';`
    console.log('change')
		mySqlConnection.query(request, (err, rows, fields) => {
      if (err) throw err;
      res.sendStatus(200);
    });
	});
});


/* GET delete cookie */
loginRouter.get('/revoked', authenticated, function (req, res, next) {
  res.clearCookie('auth');
  res.redirect('/');
})