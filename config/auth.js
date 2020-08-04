//export
module.exports = {

    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');//login page
    },
    
    //exporting to user
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {//already login
        return next();
      }
      res.redirect('/'); // redirect to login page    
    }
  };