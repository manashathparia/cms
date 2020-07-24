const sanitizeHtml = require("sanitize-html");

function sanitizeFields(obj) {
	const _obj = {};
	for (let key in obj) {
		if (typeof obj[key] === "string") {
			_obj[key] = sanitizeHtml(obj[key]);
		} else {
			_obj[key] = obj[key];
		}
	}
	return _obj;
}

module.exports = function(req, res, next) {
	if (req.method === "POST" || req.method === "PUT") {
		req.body = sanitizeFields(req.body);
	}
	next();
};
