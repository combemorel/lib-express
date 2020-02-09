import jwt from 'jsonwebtoken';
import fs from 'fs'
export function authenticated(req, res, next) {
    console.log(req.headers.cookie)
    if (req.headers.cookie !== undefined ) {
        console.log('debut authenticated')
        // retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.cookie.split("=")[1];
        let privateKey = fs.readFileSync('./private.pem', 'utf8');
        // Here we validate that the JSON Web Token is valid and has been 
        // created using the same private pass phrase
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            // if there has been an error...
            if (err) {
                // shut them out!
                res.redirect('/login');
                res.status(500).json({ error: "Not Authorized" });
                throw new Error("Not Authorized");
            }
            // if the JWT is valid, allow them to hit
            // the intended endpoint
            return next();
        });
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error 
        res.redirect('/login');
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
  }