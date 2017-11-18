/**
 * Class.js
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
        name: {
            type: 'STRING'
        },
        courseNum: {
            type: 'STRING'
        },
        Description: {
            type: 'STRING'
        },
      
      
      
        lessons: {
          collection: 'Lesson',
          via: 'class'
        }
  }
};

