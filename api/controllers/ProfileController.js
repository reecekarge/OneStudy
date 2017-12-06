/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    findUser: function(req,res){
        
        var useremail = req.body.user;
        Profile.find({email:useremail}).exec(function (err, userProfiles){
          if (err) {
            return res.serverError(err);
          }
           
            var user = userProfiles[0];
            res.send(JSON.stringify(user));
             
        });
    },
    updateStatus: function(req,res){
         console.log('start updateStatus');
         var jsonUser = req.body;
         
         var email =  req.session.user;
        Profile.find({email:email}).populate('threads').populate('comments').exec(function (err, userProfiles){
          if (err) {
            return res.serverError(err);
          }
            console.log(userProfiles);
            var user = userProfiles[0];
            user.status = req.body.status;
             Profile.update({email:user.email},user).exec(function (err, updated){
                  if (err) {console.log('Error updating user profile.'); return res.send(err, 500);}
                   console.log("messaging");
                    
                    Profile.message(user.id, {status: user.status});
                    console.log('end updateStatus');
                    return res.ok();
                });
        });
    },
	save: function(req, res) {
        console.log("Start ProfileController.save");
       
        var jsonUser = req.body;
        var email =  req.session.user;
        Profile.find({email:email}).populate('threads').populate('comments').exec(function (err, userProfiles){
          if (err) {
            return res.serverError(err);
          }
            if(userProfiles.length ==0){
                Profile.create(jsonUser).exec(function(err, todo) {
                    if(err) {console.log('Error create user profile.'); return res.send(err, 500);}
                    res.redirect('/');
                });
            }else{
                console.log(jsonUser);
                var user = userProfiles[0];
                user.firstName=jsonUser.firstName;
                user.lastName=jsonUser.lastName;
                
                user.profilePic=jsonUser.profilePic;
                user.interesting=jsonUser.interesting;
                user.aboutMe=jsonUser.aboutMe;
                user.classesTaken=jsonUser.classesTaken;
                user.projectIdea=jsonUser.projectIdea;
                user.address=jsonUser.address;
                user.hopeToLearn=jsonUser.hopeToLearn;
                user.firstLogin=0;
                
                Profile.update({email:user.email},user).exec(function (err, updated){
                  if (err) {console.log('Error updating user profile.'); return res.send(err, 500);}

                    console.log("End ProfileController.save");
                    res.redirect('/');
                });
            }

        });
        
      
     }
};

