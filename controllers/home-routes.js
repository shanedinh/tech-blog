const router = require("express").Router();
// Comments and User models are needed because the post data includes that info
// you must retrive that info in your db query
const { Post, Comment, User } = require("../models/");

// http://localhost:3001/
// get all posts for homepage
router.get("/", (req, res) => {
  Post.findAll({
    atrributes: ["id", "post_id", "title", "created_at"],

    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((data) => {
      const posts = data.map((post) => post.get({ plain: true }));

      res.render("layouts/main", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// http://localhost:3001/post/:id
// get single post
router.get("/post/:id", (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ["id", "title", "post_text", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((data) => {
      const posts = data.map((post) => post.get({ plain: true }));

      res.render("single-post", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// http://localhost:3001/login
// login user route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// http://localhost:3001/signup
// signup user route
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
