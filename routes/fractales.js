const express = require("express");
const path = require("path");
const View = require("../src/view");

subrouter = express.Router();

subrouter.get("/", (req, res) => {
    filename = path.basename(__filename, path.extname(__filename));
    view = new View(filename);
    res.render(view.getPath("main"), {
        partials: {
            body: view.getPath("body")
        }
    });
})

module.exports = subrouter;