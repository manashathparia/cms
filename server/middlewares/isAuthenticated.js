const jwt = require("jsonwebtoken");

const secret = "this_is_a_secret!_now_get_lost";
const isAuthenticated = (req, res, next) => {
	let token = req.headers.authorization;
	if (!token) return res.status(401).send("unauthorized"); // if no token, continue

	token = token.replace("Bearer ", "");
	jwt.verify(token, secret, (err, user) => {
		if (err) {
			return res.status(401).json({
				success: false,
				message: "Authorisation failed, kindly please login",
			});
		}
		req.user = user; // set the user to req so other routes can use it
		next();
	});
};

module.exports = isAuthenticated;
