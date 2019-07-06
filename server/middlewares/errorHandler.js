/**
 *
 * @param {Function} fn
 * @description Default error handler for async middlewares.
 */

const asyncMiddleware = fn => async (req, res, next) => {
	try {
		await fn(req, res, next);
	} catch (e) {
		console.error(e);
		res.status(500).json({
			success: false,
			error: e.message
		});
	}
};

module.exports = asyncMiddleware;
