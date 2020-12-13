module.exports = (app) => {
    
const express = require("express");
const path = require("path");
const fs = require("fs");

router = express.Router();

root = "home";
routesPath = __dirname;
app.locals.controllers = [];
excludeFromControllers = [
    root
];

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
        if(excludeFromControllers.indexOf(routerName) < 0) {
            app.locals.controllers.push({ name: routerName });
        }
        router.use("/" + routerName, require("./" + file));
        console.log("[Info]: Router '" + routerName + "' mounted");
    });
});

router.get("/", (req, res) => { res.redirect(root) });
router.use(express.static("public"));

app.use("/", router);

};