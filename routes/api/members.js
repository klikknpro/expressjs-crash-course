const express = require("express");
const router = express.Router();
const members = require("../../Members");

// 3. rest api server or something
// gets all members
router.get("/", (req, res) => res.json(members));

// 6. get single member
router.get("/:id", (req, res) => {
  // found will be true or false
  // some() wtf is that again
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    // wanna give a status back
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});

module.exports = router;
