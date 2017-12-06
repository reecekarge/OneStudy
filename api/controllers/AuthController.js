/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwkToPem = require('jwk-to-pem');
var jwt = require('jsonwebtoken');
var request = require("request");
        
module.exports = {
    donothing:function(req,res){},
	
    authenticate: function(req, res) {
        console.log("Start AuthController.authenticate")

        var clientsecret=  'AjPhh7PEzyNC9I-p1pmAHtLn3tX27jL0GxfxSqZCF-5_5nNevYtKEc9lIHWfv1vO';
       
        var options = { method: 'POST',
          url: 'https://karge.auth0.com/oauth/token',
          headers: { 'content-type': 'application/json' },
          body: 
           { grant_type: 'authorization_code',
             client_id: 'hRFhqs_8szx8TaZq7vMFhQYrdclO1Jm1',
             client_secret:clientsecret,
             code: req.query.code,
//             redirect_uri: 'http://18.220.241.62:1337/authenticate' },
             redirect_uri: 'http://localhost:1337/donothing' },
          json: true };
           
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
             
            var jwk = {alg:'RS256',kty:'RSA',use:'sig',x5c:['MIIC+TCCAeGgAwIBAgIJYvhWjsdZEIAGMA0GCSqGSIb3DQEBCwUAMBoxGDAWBgNVBAMTD2thcmdlLmF1dGgwLmNvbTAeFw0xNzEwMjAxMzE4NDRaFw0zMTA2MjkxMzE4NDRaMBoxGDAWBgNVBAMTD2thcmdlLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALNEwWe64D+TMY10yD7kHyTBryAtO/BelF2Dm5O4DX+E2RQWV9md9Cm7Dpt3FcNDBN7qbCF3T+zXFi3Ir3gDVlOGcuGWYEVHGgHSD2s2WYza38j4YAjTTTGeQggcwo9/hclwriClZ0IJHwWsRAdSMPOgDyawnjkRHrJDgWrISBlfKhO1ok31DO0R/GvVmP8x0CxLkF1BT+gOTrR3n1ky8/Qga+f7Okxj9XROCYy5dcf9u6lqMRuanvaJflx7tdbfRcahFRgEVgztkf48ZHJqvBAUeJjplutkVghymBdningd/CWpU4ZntCwYx6FCTDm5DpUlrBfM/sfU4Y407TYzCiMCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUrZFi6/dpp4UM0EnZv+L4zdP8+rMwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQAUyHP4KtbbpEOzGRVmdnfu0Gc5izAbpJ1Zb6Lhw63Hnx1nlCfxl655F80zctFQKbER2PCzQ/mwcW3SJ38JXf6rDN1Bb/k8DIDJij4Yi/VkpftUHWnsFY74UR4+LxMJkwtwy3K6ZSoN5fAFGhT0eBPWK6LPiSidJTL/QfPKby2KqSKMS1Mr0j8HF3aaUg9v2hVPtKvxyrEcCmJmd0D+2XxzxrUjWVP0FAiQpW7WGlNDNPr6k4YAMXNrAjDiSEWB/fv0YNbRC08kIlECYUICidTaxBuKwRT3d/9UJAr/Vo/FWM/iBZs65E21ae0//a9EYDuaFdzzGkgn3APOKos/FlEb'],n:"s0TBZ7rgP5MxjXTIPuQfJMGvIC078F6UXYObk7gNf4TZFBZX2Z30KbsOm3cVw0ME3upsIXdP7NcWLciveANWU4Zy4ZZgRUcaAdIPazZZjNrfyPhgCNNNMZ5CCBzCj3-FyXCuIKVnQgkfBaxEB1Iw86APJrCeOREeskOBashIGV8qE7WiTfUM7RH8a9WY_zHQLEuQXUFP6A5OtHefWTLz9CBr5_s6TGP1dE4JjLl1x_27qWoxG5qe9ol-XHu11t9FxqEVGARWDO2R_jxkcmq8EBR4mOmW62RWCHKYF2eKeB38JalThme0LBjHoUJMObkOlSWsF8z-x9ThjjTtNjMKIw",e:"AQAB",kid:"RjAxQjUwMTA3MTc2MTQ3QTg4N0I0MjExQUIyRUVBMjM2RjQ4NDQ3QQ",x5t:"RjAxQjUwMTA3MTc2MTQ3QTg4N0I0MjExQUIyRUVBMjM2RjQ4NDQ3QQ"};
            var pem = jwkToPem(jwk);
            console.log(body.id_token);
            user = jwt.verify(body.id_token, pem);
           
            console.log(user);
            
            
            
            
            
            
            Profile.find({email:user.email}).exec(function (err, userProfiles){
                console.log('1');
              if (err) {
                  console.log('1.5');
                console.log("Profile.find errored:");
                  console.log(err);
              }
                console.log('2');
                if(userProfiles.length ==0){
                    console.log('3');
                    var newuser= {};
                    newuser.firstName='';
                    newuser.lastName='';
                    newuser.email =user.email;
                    newuser.profilePic=Math.floor(Math.random() * 50)+'';
                    newuser.firstLogin = 1;
                    newuser.interesting='';
                    newuser.aboutMe='';
                    newuser.classesTaken='';
                    newuser.projectIdea='';
                    newuser.address='';
                    newuser.hopeToLearn='';
                    newuser.defaultClassID=1;
                    Profile.create(newuser).exec(function(err, todo) {
                        console.log('4');
                        if(err) {console.log('Error create user profile.'); 
                            console.log('4');
                            console.log(err);
                          
                        }
                    });
                }
                
                console.log("End AuthController.authenticate");
                req.session.user=user.email;
                req.session.authenticated=true;
                res.redirect('/');

            });
            
            
            
            
            
            
            
            
            
            
            
            
            
        });
    },
    logout: function(req, res) {
        console.log('logging out');
        req.session.authenticated=false;
        res.redirect('https://karge.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A1337');
//        res.redirect('https://karge.auth0.com/v2/logout?returnTo=http://18.220.241.62:1337');
                      
    }
};

