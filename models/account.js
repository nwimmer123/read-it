var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Book = require('./book');

var Account = new Schema({
    username: String,
    password: String,
    books: [Book.schema]
});

Account.plugin(passportLocalMongoose);

var Account = mongoose.model('Account', Account);

module.exports = Account;

