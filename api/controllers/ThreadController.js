/**
 * ThreadController
 *
 * @description :: Server-side logic for managing Threads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    addFoundHelpful: function(req,res){
        console.log('Start addFoundHelpful');
        var threadID = req.body.threadID;
        console.log(req.body);
        Thread.find({id:threadID}).populate('comments').populate('profile').exec(function(err,threads){
             if (err) {
            return res.serverError(err);
          }
            var thread = threads[0];
            thread.foundHelpful = thread.foundHelpful+1;
            Thread.update({id:threadID},thread).exec(function(err,updated){
                 if (err) {console.log('Error updating thread.'); return res.send(err, 500);}
                 return res.ok();
            });
        });
        
    },
    findQuestions: function(req,res){
        
        console.log('Start newThread');
        var item = req.body.item;
        console.log(req.body);
        Thread.find({relatedTo:item}).populate('comments').populate('profile').exec(function(err,threads){
            if (err) {
            return res.serverError(err);
          }
            res.send(JSON.stringify(threads));
        });
    },
	newThread: function(req, res) {
        console.log('Start newThread');
        var thread = req.body;
        console.log(thread);
        var email =  req.session.user;
        Profile.find({email:email}).populate('threads').populate('comments').exec(function (err, userProfiles){
          if (err) {
            return res.serverError(err);
          }
            var user = userProfiles[0];
            thread.profile = user;
            thread.foundHelpful=0;
            
        
            Thread.create(thread).exec(function (err, newThread){
              if(err) {console.log('Error creating new thread.'); return res.send(err, 500);}
                    console.log('found thread');
                    newThread.profile=user;
                    console.log(newThread);
                   
                    Thread.publishCreate(newThread);
                    console.log('End newThread');
                    return res.ok();
            });
            
         
        });
    },
    newComment: function(req, res) {
        console.log('Start newComment');
        var comment = req.body;
        var email =  req.session.user;
        console.log(comment);
        Profile.find({email:email}).populate('threads').populate('comments').exec(function (err, userProfiles){
          if (err) {
            return res.serverError(err);
          }
            var user = userProfiles[0];
            comment.profile = user;
            comment.foundHelpful=0;
        
        
            Comment.create(comment).exec(function (err, newComment){
              if(err) {console.log('Error creating new Comment.'); return res.send(err, 500);}
                    
                    newComment.profile=user;
                    console.log(newComment);
                   
                    Comment.publishCreate(newComment);
                    console.log('End newComment');
                    return res.ok();
            });
            
         
        });
    },
    getThreadComments: function(req, res){
        console.log("Starting getThreadComments");
        console.log(req.body);
        threadID = req.body.threadID;
        Comment.find({thread:threadID}).populate('profile').populate('thread').exec(function(err,comments){
              if(err) {console.log('Error finding comments.'+err); return res.send(err, 500);}
              res.send(JSON.stringify(comments));
        });
    }
                                                          
};

