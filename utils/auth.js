//middleware to check if user is logged in
// remeber controller code changes must be made to use this code as middleware
const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    // middleware best practice and requirement to call next(), express understands this call
    next();
  }
};

module.exports = withAuth;
