const router = require("express").Router();
//Swagger route
router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags = ['Home Page']
  res.send("Welcome to the School API!");
});

//Other API routes
router.use("/students", require("./students"));
router.use("/courses", require("./courses"));

module.exports = router;