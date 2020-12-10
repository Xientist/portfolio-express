const express = require("express");

homeRouter = express.Router();

homeRouter.all("/", (req, res) => {
    res.render("home/main", {
        partials: {
            body: "home/body"
        }
    });
})

module.exports = homeRouter;