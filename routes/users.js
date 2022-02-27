const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
//const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/", async function (req, res) {
	const allUsers = await Users.findAll();
	res.json(allUsers);
});

router.post("/", async function (req, res) {
	const { username, password } = req.body;
	bcrypt.hash(password, 10).then((hash) => {
		Users.create({
			username: username,
			password: hash,
		});
		res.json("USER ADDED!");
	});
});

// router.post("/login", async function (req, res) {
// 	const { username, password } = req.body;
// 	const user = await Users.findOne({ where: { username: username } });

// 	if (!user) res.json({ error: "User does not exist" });

// 	bcrypt.compare(password, user.password).then((match) => {
// 		if (!match) res.json({ error: "Wrong username and password combination" });

// 		const accessToken = sign(
// 			{ username: user.username, id: user.id },
// 			"x7HKJrfQa3ZNmre"
// 		);
// 		res.json({ token: accessToken, username: user.username, id: user.id });
// 	});
// });

// router.get("/auth", validateToken, function (req, res) {
// 	res.json(req.user);
// });
module.exports = router;
