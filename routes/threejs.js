module.exports = (app) => {

    const express = require("express");
    const path = require("path");
    const fs = require("fs");
    const View = require("../src/view");

    subrouter = express.Router();
    subname = "threejs";

    modelPath = "public/resources/models/";
    modelExtension = ".glb";

    mwDefault = (req, res) => {
        res.redirect("threejs/load/default");
    };

    mwLoad = (req, res, next) => {
        filename = path.basename(__filename, path.extname(__filename));
        view = new View(filename);
        mdl = req.params.model;
        filePath = modelPath + mdl + modelExtension;
        if(fs.existsSync(filePath)) {
            res.locals = {
                model: mdl
            }
            res.render(view.getPath("main"), {
                partials: {
                    body: view.getPath("body"),
                    three: view.getPath("three")
                }
            });
        } else {
            next();
        }
    };

    mwModelNotFound = (req, res) => {
        mdl = req.params.model;
        res.send("The specified model '" + mdl + "' does not exist.");
    };

    subrouter.get("/", mwDefault);
    subrouter.get("/load/:model", mwLoad, mwModelNotFound);

    app.locals.controllers.push({
        name: "ThreeJS",
        root: subname
    })

    app.use("/" + subname, subrouter);
    console.log("[Info]: Router '" + subname + "' mounted");
};