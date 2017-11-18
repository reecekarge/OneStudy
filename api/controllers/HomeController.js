/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    message: function(req,res){
        
        var message = req.body.message;
         var email =  req.session.user;
        Profile.find({email:email}).exec(function (err, userProfiles){
            if (err) {
                return res.serverError(err);
            }
            var user = userProfiles[0];
            
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd = '0'+dd
            } 

            if(mm<10) {
                mm = '0'+mm
            } 

            today = mm + '/' + dd + '/' + yyyy;

         sails.sockets.broadcast('main', { pic:user.profilePic,name:user.firstName+' '+user.lastName,date:today,text:message });

            console.log("End HomeController.loadHome");
            return res.ok();
        });
        
    },
    loadHome: function(req, res) {

        console.log("Start HomeController.loadHome");
        var email =  req.session.user;
        Profile.find({email:email}).exec(function (err, userProfiles){
            if (err) {
                return res.serverError(err);
            }



            var userProfile = userProfiles[0];

            console.log("End HomeController.loadHome");
            return res.view('homepage',{userProfile: userProfile });
        });

    },
    subscribe: function(req,res){

        console.log("Start HomeController.subscribe");
        if (!req.isSocket) {
            console.log("not a socket request!")
            return res.ok();
        }


        sails.sockets.join(req, 'main', function(err) {
            if (err) {
                return res.serverError(err);
            }
            
        console.log("End HomeController.subscribe");
            res.send(JSON.stringify({ message: 'Subscribed to a fun room called main!'}));

        });
}
}

