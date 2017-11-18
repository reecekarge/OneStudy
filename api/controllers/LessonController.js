/**
 * LessonController
 *
 * @description :: Server-side logic for managing Lessons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	loadLesson:function(req, res){
        var lesson1Vids= 'WxYy9A20c54,wnCSVssDPv8,mkYEVWZ6tYI,vWNnOnzpxbo,6IVOnxiYhYs,50a0Ai2RXgU,M9Bvrtknm_4,SNJj8B0mGhU,KCcc6oqx6qk,H0d2OHt65OU,CzFXhfRU9L8,VK5b5ZQEI7M';
        var newLesson = {};
        newLesson.name = 'Lesson 1';
        newLesson.Description= 'Introduction: Introduction to CS6460';
        newLesson.url =lesson1Vids;
        newLesson.class=1;
         Lesson.create(newLesson).exec(function(err, todo) {
            
            if(err) {console.log('Error create user profile.'); 
                console.log('4');
                console.log(err);

            }
        });
    }
};

