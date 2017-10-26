/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
//  return res.redirect('https://karge.auth0.com/login?client=hRFhqs_8szx8TaZq7vMFhQYrdclO1Jm1&protocol=oauth2&redirect_uri=http%3A%2F%2Flocalhost%3A1337%2Flogin&response_type=code&scope=openid%20profile&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOC4xMC4xIn0%3D&state=Mn0OYgS9wbte8y8t6_AjbxhuKvCFwcA5');
  return res.view('login');
};
