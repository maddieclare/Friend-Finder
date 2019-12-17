const express = require("express");
const router = express.Router();
const fs = require("fs");

const friendsDatabase = JSON.parse(
  fs.readFileSync("app/data/friends.json", "utf8")
);

router.get("/api/friends", function(req, res) {
  res.send(friendsDatabase);
});

router.post("/api/friends", (req, res) => {
  friendsDatabase.data.push(req.body);
  let databaseString = JSON.stringify(friendsDatabase, null, 4);
  fs.writeFileSync("app/data/friends.json", databaseString);
  res.send("Friend added");
});

module.exports = router;
