const express = require("express");

const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.set("layout", "common/layout");
app.set("partials", { head: "common/head" });
app.engine("html", require("hogan-express"));

require("./routes/index.js")(app);

app.listen(3000, () => {
    console.log("[Info]: App started on port 3000");
});