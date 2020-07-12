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
			.then(() => {
				res.status(200).json({
					success: true,
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
	const rememberTillDeath = req.body.remember;
	console.log(rememberTillDeath);
	User.findOne({ email: req.body.email })
		.exec()
		.then((user) => {
			if (!user) throw Error("User not found");
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
							id: user._id,
						},
						secret,
						{
							expiresIn: rememberTillDeath ? "30d" : "1h", // Just assuming that you will be dead under 30 days
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

router.get("/verify/:token", (req, res) => {
	if (!req.params.token) {
		res.status(400).send("Token not provided");
	}
	jwt.verify(req.params.token, secret, (err, decoded) => {
		if (err) {
			res.status(401).send("Invalid token");
		}
		if (decoded) {
			res.send(decoded);
		}
	});
});

module.exports = router;
