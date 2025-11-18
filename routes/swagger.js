const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger.json");

router.use("/api-doc", swaggerUi.serve);
router.get("/api-doc", swaggerUi.setup(swaggerFile));

module.exports = router;