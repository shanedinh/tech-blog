const router = require("express").Router();
const { Post, Comment, User } = require("../../models/");
const withAuth = require("../../utils/auth");

//create a new post
// http://localhost:3000/api/post
router.post("/", withAuth, (req, res) => {
  //   const body = req.body;
  // console.log(req.session.userId);
  Post.create({
    title: req.body.title,
    user_id: req.session,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
// update a post
// http://localhost:3000/api/post/:id
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      if (data > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
// delete a post
// http://localhost:3000/api/post/:id
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
