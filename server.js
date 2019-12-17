const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/static/:filename", function(req, res) {
  res.sendFile(path.join(__dirname, "static", req.params.filename));
})

let htmlRoutes = require("./app/routing/htmlRoutes");
app.use(htmlRoutes);

let apiRoutes = require("./app/routing/apiRoutes");
app.use(apiRoutes);

app.listen(PORT, function() {
  console.log(`App listening on PORT ${PORT}`);
});