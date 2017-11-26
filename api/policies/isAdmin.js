/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to only allow admin access
 *
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.user.isAdmin) {
    return next();
  }
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('Admin priviledge is required to perform this action.');
};
