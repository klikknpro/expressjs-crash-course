const express = require("express");
// const res = require("express/lib/response");
const uuid = require("uuid");
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

// 8. asszem - create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please include a name, email" });
  }
  members.push(newMember);
  res.json(members);
  // res.redirect("/");
});

// 9. update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
        res.json({ msg: "the member was updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});

// delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({ msg: "member deleted", members: members.filter((member) => member.id !== parseInt(req.params.id)) });
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});

module.exports = router;
