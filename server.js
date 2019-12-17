const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/static/:filename", function(req, res) {
  res.sendFile(path.join(__dirname, "static", req.params.filename));
})

let htmlRoutes = require("./app/routing/htmlRoutes");
app.use(htmlRoutes);

let apiRoutes = require("./app/routing/apiRoutes");
app.use("/api", apiRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log("App listening");
});