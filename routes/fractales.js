module.exports = (app) => {

    const express = require("express");
    const path = require("path");
    const View = require("../src/view");

    subrouter = express.Router();
    subname = "fractales";

    subrouter.get("/", (req, res) => {
        filename = path.basename(__filename, path.extname(__filename));
        view = new View(filename);
        res.render(view.getPath("main"), {
            partials: {
                body: view.getPath("body")
            }
        });
    })

    app.locals.controllers.push({
        name: "Fractales",
        root: subname
    })
    
    app.use("/" + subname, subrouter);
    console.log("[Info]: Router '" + subname + "' mounted");
};