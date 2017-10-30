/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 save: function(req, res) {
        console.log("profile controller");
        console.log(req.body);
        var jsonUser = req.body;
        Profile.create(jsonUser).exec(function(err, todo) {
            if(err) throw err
            return res.ok();
        });
        res.redirect('/');
     }
        
};

