module.exports = (app) => {
    
const express = require("express");
const path = require("path");
const fs = require("fs");

router = express.Router();

root = "home";
routesPath = __dirname;
app.locals.controllers = [];

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
        ({ subrouter, subname } = require("./" + file)(app));
        router.use("/" + subname, subrouter);
        console.log("[Info]: Router '" + subname + "' mounted");
    });
});

router.get("/", (req, res) => { res.redirect(root) });
router.use(express.static("public"));

app.use("/", router);

};