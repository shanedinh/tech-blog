const router = require("express").Router();
// Comments and User models are needed because the post data includes that info
// you must retrive that info in your db query 
const { Post, Comment, User } = require("../models/");

// http://localhost:3001/
// get all posts for homepage
router.get("/", (req, res) => {
	Post.findAll({
		//code here
	})
		.then((data) => {
			// code here
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// http://localhost:3001/post/:id
// get single post
router.get("/post/:id", (req, res) => {
	Post.findByPk(req.params.id, {
		//code here
	})
		.then((data) => {
			// code here
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// http://localhost:3001/login
// login user route
router.get("/login", (req, res) => {
	// code here
});

// http://localhost:3001/signup
// signup user route
router.get("/signup", (req, res) => {
	// code here
});

module.exports = router;
