var mongoose = require("mongoose");
//heroku connection
// mongoose.connect( process.env.MONGOLAB_URI ||
//                   process.env.MONGOHQ_URL ||
//                   "mongodb://localhost/project-01_test" );

var Book = require('./book');
var Review = require('./review');
var Account = require('./account');

module.exports.Book = require('./book.js');

module.exports.Account = Account;
module.exports.Review = Review;