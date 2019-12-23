var Author = require('../models/author')
var async = require('async');
var Book = require('../models/book');


// Display list of all Authors.
exports.author_list = function(req, res, next) {

  Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('author_list', { title: 'Author List', author_list: list_authors });
    });

};

//display detail page of specific author
exports.author_detail = function(req,res,next){
  
  async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
              .exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.params.id },'title summary')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author==null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
      // Successful, so render.
      console.log('yes-----------')
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books } );
    });
}

//display author create form on get request
exports.author_create_get = function(req,res){
  res.send('not implemented: author_create_get')
}

//handle author create on post request
exports.author_create_post = function(req,res){
  res.send('not implemented:author_create_post')
}

//display author delete form on get request
exports.author_delete_get = function(req,res){
  res.send('not implemented:author_delete_get')
}

//handle author delete on post
exports.author_delete_post = function(req,res){
  res.send('not implemented:author delete post')
}

//display author update form on get request
exports.author_update_get = function(req,res){
  res.send('not implemented:author_update_get')
}

//handle author update on post
exports.author_update_post = function(req,res){
  res.send('not implemented:author update post')
}


