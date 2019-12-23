var BookInstance = require('../models/bookInstance')


//display list of bookinstances
exports.bookinstance_list = function(req,res,next){

  BookInstance.find()
    .populate('book')
    .exec(function(err, list_bookinstances){
      if (err) { return next(err) }
      res.render('bookinstance_list', {title: 'book instance list', bookinstance_list: list_bookinstances})
    })
}


//display detail page of specific bookinstance
exports.bookinstance_detail = function(req,res,next){
    BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookinstance) {
      if (err) { return next(err); }
      if (bookinstance==null) { // No results.
          var err = new Error('Book copy not found');
          err.status = 404;
          return next(err);
        }
      // Successful, so render.
      res.render('bookinstance_detail', { title: 'Copy: '+bookinstance.book.title, bookinstance:  bookinstance});
    })
}

//display bookinstance create form on get request
exports.bookinstance_create_get = function(req,res){
  res.send('not implemented: bookinstance_create_get')
}

//handle bookinstance create on post request
exports.bookinstance_create_post = function(req,res){
  res.send('not implemented:bookinstance_create_post')
}

//display bookinstance delete form on get request
exports.bookinstance_delete_get = function(req,res){
  res.send('not implemented:bookinstance_delete_get')
}

//handle bookinstance delete on post
exports.bookinstance_delete_post = function(req,res){ res.send('not implemented:bookinstance delete post') }

//display bookinstance update form on get request
exports.bookinstance_update_get = function(req,res){
  res.send('not implemented:bookinstance_update_get')
}

//handle bookinstance update on post
exports.bookinstance_update_post = function(req,res){
  res.send('not implemented:bookinstance update post')
}
