const express = require("express");
const router = express.Router();
const fs = require("fs");

const getFriendsDatabase = () => {
  return friendsDatabase = JSON.parse(
    fs.readFileSync("app/data/friends.json", "utf8")
  );
}

router.get("/friends", function(req, res) {
  res.send(friendsDatabase);
  var friendsDatabase = getFriendsDatabase();
});

router.post("/friends", (req, res) => {
  var myBestFriend = getBestMatch(req.body);
  var friendsDatabase = getFriendsDatabase();
  friendsDatabase.data.push(req.body);
  let databaseString = JSON.stringify(friendsDatabase, null, 4);
  fs.writeFileSync("app/data/friends.json", databaseString);
  res.send(myBestFriend);
});

function getBestMatch(person) {
  var friendsDatabase = getFriendsDatabase().data;
  var bestFriend = {};
  var bestFriendValue = 1e6;
  for (let i = 0; i < friendsDatabase.length; i++) {
    var friendScore = calculateMatch(person, friendsDatabase[i]);
    if (bestFriendValue > friendScore) {
      bestFriendValue = friendScore;
      bestFriend = friendsDatabase[i];
    }
  }
  return bestFriend;
}

function calculateMatch(personOne, personTwo) {
  var differenceOverall = 0;
  for (var i = 0; i < personOne.scores.length; i++) {
    differenceOverall += Math.abs(personOne.scores[i] - personTwo.scores[i]);
  }
  return differenceOverall;
}

module.exports = router;
