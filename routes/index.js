const express = require("express");
const path = require("path");
const fs = require("fs");

router = express.Router();

home = "home";
routesPath = __dirname;

fs.readdir(routesPath, (err, files) => {
    if(err) {
        return console.log("[Error]: Unable to scan directory: " + err);
    }

    routerFiles = files.filter((file) => {
        ext = path.extname(file);
        return path.basename(file, ext).toLowerCase() !== path.basename(__filename, ext);
    });

    routerFiles.forEach((file) => {
        ext = path.extname(file);
        routerName = path.basename(file, ext);
        router.use("/" + routerName, require("./" + file));
        console.log("[Info]: Router '" + routerName + "' loaded");
    });
});

router.get("/", (req, res) => { res.redirect(home) });
router.use(express.static("public"));

module.exports = router;