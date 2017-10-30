/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	loadHome: function(req, res) {
//        console.log(req.allParams());
        
//        
//        Profile.find({name:'Finn'}).exec(function (err, usersNamedFinn){
//          if (err) {
//            return res.serverError(err);
//          }
//         
//          return res.json(usersNamedFinn);
//        });
//        
//    res.view({ layout: 'mylayout', myModel: modelObj });
//        return res.view('homepage',{myModel: modelObj });
        return res.view('homepage');
    }
};

