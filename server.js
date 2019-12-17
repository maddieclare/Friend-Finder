const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

let friendsDatabase = JSON.parse(fs.readFileSync("app/data/friends.json", "utf8"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
  console.log(`App listening on PORT ${PORT}`);
});

app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "app", "public", "home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app", "public", "survey.html"));
});

app.get("/api/friends", function(req, res) {
  res.send(friendsDatabase);
});

app.post("/api/friends", (req, res) => {
  friendsDatabase.data.push(req.body);
  let databaseString = JSON.stringify(friendsDatabase, null, 3);
  fs.writeFileSync("app/data/friends.json", databaseString);
  res.send("Friend added");
  console.log(friendsDatabase);
});