const jwt = require("jsonwebtoken");

const secret = "this_is_a_secret!_now_get_lost";
const isAuthenticated = (req, res, next, respond = true) => {
	let token = req.headers.authorization;
	if (!token)
		if (respond) return res.status(401).send("unauthorized");
		// if no token, continue
		else {
			return false;
		}

	token = token.replace("Bearer ", "");
	jwt.verify(token, secret, (err, user) => {
		if (err) {
			if (respond)
				return res.status(401).json({
					success: false,
					message: "Authorisation failed, kindly please login",
				});
			else return false;
		}
		req.user = user; // set the user to req so other routes can use it
		if (!respond) return;
		next();
	});
	return req.user ? true : false;
};

module.exports = isAuthenticated;
