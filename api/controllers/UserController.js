/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var EmailAddresses = require('machinepack-emailaddresses');

module.exports = {
  register: function(req, res) {
    var email = req.param('email');
    var password = req.param('password');

    //validate request
    if (_.isUndefined(req.param('email'))) {         
      return res.badRequest('An email address is required!');    
    }
    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('A password is required');
    }
    if (req.param('password').length < 6) {
      return res.badRequest('A password must be at least 6 character')
    }
    if (req.param('isAdmin') == true) {
      return res.badRequest('Cannot be assigned admin role')
    }
    EmailAddresses.validate({
      string: email
    }).exec({
      error: function(err) {
        return res.serverError(err);
      },
      invalid: function() {
        return res.badRequest('Does not looks like an email address for me :)');
      },
      success: function() {
        User.findOne({
          email: email
        }).exec(function(err, result) {
          //validate from database
          if (err) {
            return res.serverError(err);
          } else if (result) {
            return res.badRequest('Email already used!');
          } else {

            User.create({
              username: email,
              email: email,
              password: password
            }).exec(function(err, result) {
              if (err) {
                return res.serverError(err);
                //return res.badRequest('Error create user');
              }
              return res.ok(result);
            })
          }
        });
      }

    })
  },

  update: function(req, res) {

    //if the user is attempting to change the admin status: they must be an admin themselves
    if (!_.isUndefined(req.body.isAdmin)) {
      if( !req.user.isAdmin ){
        return res.forbidden('Admin priviledge is required to perform this action.');
      }
    }

    User.update({id:req.param('id')},req.body).exec( function( err , user ){
			if( err ){
				return res.negotiate( err );
			}
			return res.ok( user );
		});
  }
};
