const router = require("express").Router();

const apiProductUser = require("./api/products");

router.use("/user", apiProductUser);
module.exports = router;
