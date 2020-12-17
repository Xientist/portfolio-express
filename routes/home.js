module.exports = (app) => {

    const express = require("express");
    const path = require("path");
    const View = require("../src/view");

    subrouter = express.Router();
    subname = "home";

    subrouter.get("/", (req, res) => {
        filename = path.basename(__filename, path.extname(__filename));
        view = new View(filename);
        res.locals = {
            title: "Bienvenue sur mon portfolio !",
            name: "Julien Weissenberger",
            controllers: req.app.locals.controllers
        };
        res.render(view.getPath("main"), {
            partials: {
                titlescreen: view.getPath("titlescreen"),
                menu: view.getPath("menu"),
                extra: view.getPath("extra")
            }
        });
    });

    app.use("/" + subname, subrouter);
    console.log("[Info]: Router '" + subname + "' mounted");
};