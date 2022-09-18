const router = require("express").Router();
const { User } = require("../../models");

// post a new user
// http://localhost:3000/api/users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((data) => {
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.username = data.username;
        req.session.loggedIn = true;
      });

      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login a user
// http://localhost:3000/api/users/login
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((data) => {
    if (!data) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }
    // it is good during development to log a sucessful login
    const validPassword = data.checkPassword(req.body.password);
    // it is good during development to log a un sucessful login reason
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.username = data.username;
      req.session.loggedIn = true;

      // great to have this message
      res.json({ user: data, message: "You are now logged in!" });
    });
  });
});

// logout user
// http://localhost:3000/api/users/logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // it is important to end() the destruction of the sesion data here, otherwize you app could stall
      res.status(204).json({ message: "You are now logged out!" }).end();
    });
  } else {
    // you will commonly see the end() with 404s
    res.status(400).end();
  }
});

// delete a user
// http://localhost:3000/api/users/user/:id
router.delete("/user/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
