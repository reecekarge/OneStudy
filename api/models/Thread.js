/**
 * Thread.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
 id: {
            columnName: 'id',
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        text: {
            type: 'STRING'
        },
        summary: {
            type: 'STRING'
        },
        foundHelpful:{
            type: 'integer'
        },
      
        postedOn:{
            type: 'DATE'
            
        },
        relatedTo:{
            type: 'STRING'
        },
        datePosted:{
             type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        comments: {
          collection: 'Comment',
          via: 'thread'
        },
        profile: {
            model: 'Profile'
        }
  }
};

