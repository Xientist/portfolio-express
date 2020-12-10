const express = require("express");

router = express.Router();

router.all("/", require("./home.js"));
router.use(express.static("public"));
router.use("/threejs", require("./threejs.js"));

module.exports = router;