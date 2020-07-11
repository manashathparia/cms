const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../db/models/user.model");

const router = express.Router();

const secret = "this_is_a_secret!_now_get_lost";

router.post("/signup", (req, res) => {
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if (err) {
			console.error(err);
			return res.status(500).json({
				error: err,
			});
		}
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash,
		});
		user
			.save()
			.then((result) => {
				res.status(200).json({
					success: true,
					...result,
				});
			})
			.catch((error) => {
				console.log(error);
				res.status(500).json({
					error,
				});
			});
	});
});

router.post("/signin", (req, res) => {
	User.findOne({ email: req.body.email })
		.exec()
		.then((user) => {
			bcrypt.compare(req.body.password, user.password, (err, result) => {
				if (err) {
					return res.status(401).json({
						failed: "Unauthorized Access",
					});
				}
				if (result) {
					const JWTToken = jwt.sign(
						{
							username: user.username,
							email: user.email,
						},
						secret,
						{
							expiresIn: "1h",
						}
					);
					return res.status(200).json({
						success: true,
						token: JWTToken,
					});
				}
				return res.status(401).json({
					failed: "Unauthorized Access",
				});
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error,
			});
		});
});

router.post("/verify", (req, res) => {
	if (!req.body.token) {
		res.status(400).send("token not provided");
	}
	jwt.verify(req.body.token, "secret", (err, decoded) => {
		if (err) {
			res.status(401).json({ success: false, err });
		}
		if (decoded) {
			res.send(decoded);
		}
	});
});

module.exports = router;
