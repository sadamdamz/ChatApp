const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Chat = require("../models/Chat")

router.use(cors());
process.env.SECRETKEY = "secret";

router.get("/search", async (req, res) => {
  try {
    const query = req.query;
    const user = await User.find({ userId: query.q });
    if (query.q != query.user) {
      res.send(user);
    } else{
      return
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/register", (req, res) => {
  const userData = {
    userId: req.body.userId,
    email: req.body.email,
    password: req.body.password,
  };
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + "registerd" });
            })
            .catch((err) => {
              console.log(`${err} err`);
            });
        });
      } else {
        res.json({ error: "user alread registered" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            userId: user.userId,
            email: user.email,
            password: user.password,
          };
          console.log(payload);
          let token = jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: "24hr",
          });
          res.send(token);
        } else {
          res.send({ error: "user does not exist" });
        }
      } else {
        res.send({ error: "user does not exist" });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/chats',async(req,res)=>{
  let query = req.query;
  console.log(query)
  try{
  var chats = await Chat.find({
    $and: [
        { $or: [{from:query.sender}, {from:query.reciever}] },
        { $or: [{to:query.sender}, {to:query.reciever}] }
    ]});
  var chat = chats
  console.log(chat)
  return res.send(chat);
  }
  catch(err){
    res.sendStatus(400)
  }

})

module.exports = router;
