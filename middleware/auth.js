const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json("You must be logged in to access this resource.");
  }
  next();
};

module.exports =
    isAuthenticated
