const router = require("express").Router();
const passport = require("passport");

//Swagger route
router.use("/", require("./swagger"));
//Other API routes
router.use("/students", require("./students"));
router.use("/courses", require("./courses"));
// // Home page route
// router.get("/", (req, res) => {
//   //#swagger.tags = ['Home Page']
//   res.send("Welcome to the School API!");
// });

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function(req, res, next) {
   req.logout(function(err) {
     if (err) { return next(err); }
     res.redirect("/");
   });
});

module.exports = router;