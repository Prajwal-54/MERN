const express = require("express");
const uuid = require("uuid");
const route = express.Router();
const members = require("../../Members");

//get all members
route.get("/", (req, res) => {
  res.json(members);
});
//get single members
// : is parameter in url
// parseINT bcz req.params.id is string by default and memberes.id is INT
route.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `member not found with id ${req.params.id}` });
  }
});

//creating a member
route.post("/", (req, res) => {
  // res.send(req.body)
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.email || !newMember.name) {
    res.status(400).json({ msg: "please enter name and email" });
  } else {
    members.push(newMember);
    // res.json(members);
    // res.redirect('/')
  }
});

//updating member details
route.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updatedMember = req.body;

    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;

        res.json({ msg: "member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `member not found with id ${req.params.id}` });
  }
});

//delet member
route.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({msg: 'member deleted',members:members.filter((member) => member.id !== parseInt(req.params.id))});
  } else {
    res.status(400).json({ msg: `member not found with id ${req.params.id}` });
  }
});

module.exports = route;
