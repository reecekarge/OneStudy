/**
 * ClassController
 *
 * @description :: Server-side logic for managing Classes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	loadClass:function(req, res){
        var newClass={};
         newClass.name = 'Educational Technology';
        newClass.courseNum = 'CS6460';
    
         Class.create(newClass).exec(function(err, todo) {
            
            if(err) {console.log('Error create user profile.'); 
                console.log('4');
                console.log(err);

            }
        });
    }
};

