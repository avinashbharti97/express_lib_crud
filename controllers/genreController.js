var Genre  = require('../models/genre')
var Book = require('../models/book')
var async = require('async')
const validator = require('express-validator')


exports.index = function(req,res){
  res.send('not implemented: site home page')
}

//display list of genres
exports.genre_list = function(req,res, next){

  Genre.find()
    .exec(function(err, list_genre){
    if(err){return next(err)}
      res.render('genre_list', {title:'Genre list', genre_list: list_genre})
            
})
}

//display detail page of specific genre
exports.genre_detail = function(req,res,next){

  async.parallel({
    genre: function(callback){
      Genre.findById(req.params.id)
        .exec(callback)
    },

    genre_books: function(callback){
      Book.find({'genre':req.params.id})
        .exec(callback)
    },
  }, function(err, results){
    if(err) {
      return next(err)
    }

    res.render('genre_detail', {title:'genre detail', genre:results.genre, genre_books:results.genre_books})
  })
}

//display genre create form on get request
exports.genre_create_get = function(req,res,next){
  res.render('genre_form', {title: 'create genre'})
}

//handle genre create on post request
exports.genre_create_post =  [
  //validator that will check if name field is empty or not 
  validator.body('name', 'genre name required').isLength({min:1}).trim(),

  //sanitize the name field
  validator.sanitizeBody('name').escape(),

  //process the requrest after validation and sanitization
  (req, res, next)=>{
    const errors = validator.validationResult(req);

    var genre = new Genre(
      {name: req.body.name}
  )

    if(!errors.isEmpty()){
      res.render('genre_form', {title:'create genre', genre:genre, errors:errors.array()})
      return;
    }
    else{
      Genre.findOne({'name':req.body.name})
        .exec(function(err, found_genre){
          if(err){return next(err)}
          if(found_genre){
            res.redirect(found_genre.url)
          }
          else{
            genre.save(function(err){
              if(err){return next(err)}
              res.redirect(genre.url)
            })
          }
        })
    }
  }
] 
  


//display genre delete form on get request
exports.genre_delete_get = function(req,res){
  res.send('not implemented:genre_delete_get')
}

//handle genre delete on post
exports.genre_delete_post = function(req,res){ res.send('not implemented:genre delete post') }

//display genre update form on get request
exports.genre_update_get = function(req,res){
  res.send('not implemented:genre_update_get')
}

//handle genre update on post
exports.genre_update_post = function(req,res){
  res.send('not implemented:genre update post')
}
