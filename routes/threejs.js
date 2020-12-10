const express = require("express");
const fs = require("fs");

threejsRouter = express.Router();

mwDefault = (req, res) => {
    res.redirect("threejs/default");
};

mwLoad = (req, res, next) => {
    mdl = req.params.model;
    path = "public/resources/models/" + mdl + ".glb";
    if(fs.existsSync(path)) {
        res.render("threejs/main", {
            model: mdl,
            partials: {
                body: "threejs/body",
                three: "threejs/three"
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

threejsRouter.all("/", mwDefault);
threejsRouter.get("/:model", mwLoad, mwModelNotFound);

module.exports = threejsRouter;