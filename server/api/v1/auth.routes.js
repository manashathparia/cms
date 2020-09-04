const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../db/models/user.model");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const router = express.Router();

const secret = "this_is_a_secret!_now_get_lost";

router
	.route("/user/:id")
	.get(isAuthenticated, async (req, res) => {
		try {
			const user = await (await User.findById(req.params.id)).toObject();
			delete user.password;
			res.json(user);
		} catch (error) {
			console.err(error);
			res.status(500).send("Error occured");
		}
	})
	.put(isAuthenticated, async (req, res) => {
		try {
			console.log(req.query);
			if (req.query.reset) {
				const user = await (await User.findById(req.params.id)).toObject();
				console.log(req.body);
				const matched = await bcrypt.compare(
					req.body.currentPassword,
					user.password
				);
				if (!matched) {
					res.status(401).send("Incorrect current password");
				}
				const newHash = await bcrypt.hash(req.body.newPassword, 10);
				req.body = { password: newHash };
			}

			await User.findByIdAndUpdate(req.params.id, req.body);
			res.send(200);
		} catch (error) {
			console.error(error);
			res.status(500).send("Error occured");
		}
	});

router.post("/signup", (req, res) => {
	console.log(req.body);
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if (err) {
			console.error(err);
			return res.status(500).json({
				error: err,
			});
		}
		const user = new User({
			...req.body,
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
