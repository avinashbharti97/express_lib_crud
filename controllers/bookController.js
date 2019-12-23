var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookInstance');

var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        book_count: function(callback) {
            Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        book_instance_count: function(callback) {
            BookInstance.countDocuments({}, callback);
        },
        book_instance_available_count: function(callback) {
            BookInstance.countDocuments({status:'Available'}, callback);
        },
        author_count: function(callback) {
            Author.countDocuments({}, callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};


//display list of books
exports.book_list = function(req,res,next){

  Book.find({}, 'title author')
    .populate('author')
    .exec(function(err, list_books){
      if(err){return next(err)}

      res.render('book_list', {title: 'book list', book_list:list_books})
    })
}

//display detail page of specific book
exports.book_detail = function(req,res,next){
  async.parallel({
        book: function(callback) {

            Book.findById(req.params.id)
              .populate('author')
              .populate('genre')
              .exec(callback);
        },
        book_instance: function(callback) {

          BookInstance.find({ 'book': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.book==null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('book_detail', { title: results.book.title, book: results.book, book_instances: results.book_instance } );
    });
}

//display book create form on get request
exports.book_create_get = function(req,res){
  res.send('not implemented: book_create_get')
}

//handle book create on post request
exports.book_create_post = function(req,res){
  res.send('not implemented:book_create_post')
}

//display book delete form on get request
exports.book_delete_get = function(req,res){
  res.send('not implemented:book_delete_get')
}

//handle book delete on post
exports.book_delete_post = function(req,res){ res.send('not implemented:book delete post') }

//display book update form on get request
exports.book_update_get = function(req,res){
  res.send('not implemented:book_update_get')
}

//handle book update on post
exports.book_update_post = function(req,res){
  res.send('not implemented:book update post')
}
