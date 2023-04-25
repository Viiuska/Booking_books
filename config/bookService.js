const Book = require('../models/book');
const config = require('../config/database');

module.exports.findOneBookDBService = (bookDetais) => {
    return new Promise(function myFn(resolve, reject) {
        Book.findOne({title:bookDetais}, function returnData(error, result) {
          console.log(result)
          if(error)
          {
                reject(false);
          }
          else
          {
             resolve(result);
          }
        });
    });
}