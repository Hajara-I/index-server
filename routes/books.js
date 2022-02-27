const express = require("express");
const router = express.Router();
const { Books } = require("../models");

//const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
	const listOfBooks = await Books.findAll();
	res.json(listOfBooks);
});

router.get("/byBookId/:id", async (req, res) => {
	const id = req.params.id;
	const book = await Books.findByPk(id);
	res.json(book);
});

router.get("/byuserId/:id", async (req, res) => {
	const id = req.params.id;
	const listOfBooks = await Books.findAll({
		where: { UserId: id },
	});
	res.json(listOfBooks);
});

router.post("/", async function (req, res) {
	const book = req.body;
	await Books.create(book);
	res.send(book);
});

// router.post("/", validateToken, async (req, res) => {
//   const post = req.body;
//   post.username = req.user.username;
//   post.UserId = req.user.id;
//   await Posts.create(post);
//   res.json(post);
// });

// router.delete("/:postId", validateToken, async (req, res) => {
//   const postId = req.params.postId;
//   await Posts.destroy({
//     where: {
//       id: postId,
//     },
//   });
//   res.json("DELETED SUCCESSFULLY");
// });

module.exports = router;
