const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", function(req, res) {
  res.send("Testing");
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});