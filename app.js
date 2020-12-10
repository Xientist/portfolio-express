const express = require("express");

const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.set("partials", { head: "common/head" });
app.engine("html", require("hogan-express"));

app.use("/", require("./routes/index.js"));

app.listen(3000, () => {
    console.log("App started on port 3000");
});