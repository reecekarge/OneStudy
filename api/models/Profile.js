/**
 * Profile.js
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
        firstName: {
            type: 'STRING'
        },
        lastName: {
            type: 'STRING'
        },
        profilePic: {
            type: 'STRING'
        },
        email:{
            type:'STRING'  
        },
        interesting: {
            type: 'STRING'
        },
        aboutMe: {
            type: 'STRING'
        },
        classesTaken: {
            type: 'STRING'
        },
        projectIdea: {
            type: 'STRING'
        },
        address: {
            type: 'STRING'
        },
        hopeToLearn: {
            type: 'STRING'
        },
        firstLogin:{
            type: 'integer',
        },
        defaultClassID:{
            type: 'integer',
        },
        status:{
            type: 'STRING',
            
        },
        threads: {
          collection: 'Thread',
          via: 'profile'
        }
  }
};

