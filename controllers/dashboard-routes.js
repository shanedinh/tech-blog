const router = require("express").Router();
// in order to work with the database we need to require the models which in turn are connected to the database
// this is a named import, Also a constructor,
const { Post, User, Comment } = require("../models/");
const withAuth = require("../utils/auth");

// http://localhost:3000/dashboard/
// withAuth middleware is used to check if the user is logged in
router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  console.log("=================");
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "post_id", "title", "created_at"],
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

      res.render("dashboard", {
        posts,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      // if there is an error redirect to the login handlebar
      res.redirect("login");
    });
});
// http://localhost:3000/dashboard/new
// user must be logged in to see this route
router.get("/new", withAuth, (req, res) => {
  res.render("<!-- handlebar here -->", {
    // code here
  });
});

// http://localhost:3000/dashboard/edit/:id
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id)
    .then((data) => {
      const post = data.get({ plain: true });

      res.render("edit-post", {
        post,
        loggedIn: true,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
