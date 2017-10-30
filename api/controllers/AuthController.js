/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//var jwt = require('jsonwebtoken');
module.exports = {
	authenticate: function(req, res) {
        
//	    console.log('testing');
//        console.log(req.query.code);
//        console.log(req.url);
        

        var request = require("request");

        var options = { method: 'POST',
          url: 'https://karge.auth0.com/oauth/token',
          headers: { 'content-type': 'application/json' },
          body: 
           { grant_type: 'authorization_code',
             client_id: 'hRFhqs_8szx8TaZq7vMFhQYrdclO1Jm1',
             client_secret: 'AjPhh7PEzyNC9I-p1pmAHtLn3tX27jL0GxfxSqZCF-5_5nNevYtKEc9lIHWfv1vO',
             code: req.query.code,
             redirect_uri: 'http://18.220.241.62:1337/authenticate' },
          json: true };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);
//             console.log(body);
//             console.log(response.headers);
//            jwt.verify()
            req.session.authenticated=true;
            res.redirect('/');
        });
    },
    logout: function(req, res) {
        console.log('logging out');
        req.session.authenticated=false;
        res.redirect('https://karge.auth0.com/v2/logout?returnTo=http%3A%2F%2F18.220.241.62%3A1337');
                      
    }
};

