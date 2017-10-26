/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	loadHome: function(req, res) {
        console.log(req.allParams());
        return res.view('homepage');
    }
};

