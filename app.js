var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;var routes = require('./routes/index');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

<<<<<<< HEAD
/**********
 * ROUTES *
 **********/

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/show', function homepage (req, res) {
  res.sendFile(__dirname + '/views/show.hbs');
});

//getting one book
app.get('/api/books/:id', function createSingleBook(req, res) {
  //get book by id and send it to views/show.html
  db.Book.findOne({_id: req.params.id}, function(err, book) {
    console.log(book);
    res.render("show",book);
  });
});

//server requesting data from database/;
app.get('/api/books', function booksIndex(req, res) {
  db.Book.find({}, function(err, books) {
    res.json(books);
  });
});

//server sending data from create book form to database and then 
//sending same data back to client
app.post('/api/books', function createBook(req, res){
  console.log ("The following should be the new book going into the database:", req.body);
  db.Book.create(req.body, function(err, book) {
    if (err) {console.log('ERROR:', err); }
    //console.log(book);
    res.json(book);
  });
});

//putting reviews into their book and returning them to the page
app.post('/api/books/:id/reviews', function createReview(req, res){
  console.log ("The following should be the new review going into the database:", req.body);
  
  var bookId = req.params.id;
  
  console.log("This should be the books ID", bookId);

  // Establishing date of review insertion/creation fucker
  var d = new Date();
  var dateValue = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();

  var newReview = new Review(req.body);
  newReview.date = dateValue;
  console.log("This is the new review as a Schema:", newReview);

  db.Book.findOne({_id: bookId}, function (err,foundBook) {
    foundBook.reviews.push(newReview);
    foundBook.save(function (err, savedBook) {
      res.json(newReview);
    });
  });
});

//delete item selected on show page
app.delete('/api/books/:id', function destroy (req, res){
  var bookId = (req.params.id);
  db.Book.remove({_id: bookId}, function(err, book) {
    if (err) {console.log('ERROR:', err); }
    res.status(204).send();
  });
});

//update book data
app.put('/api/books/:id', function updateBook (req, res) {
  var bookId = (req.params.id);
  db.Book.findByIdAndUpdate(bookId, req.body, function (err, book) {
    if (err) {console.log('ERROR:', err); }
    console.log("I have found this book and would like to update it:", book);
    book.save(function (err, savedBook) {
      if (err) {console.log('ERROR:', err); }
      console.log("WHO are you saved book?", savedBook);
      res.json(savedBook);
    });
  });
});

/************
 * DATABASE *
 ************/

var db = require('./models');
//var Post = require('./models/post');
var User = require('./models/account');
var Review = require('./models/review');

=======
>>>>>>> parent of d4baed6... added seed
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});

