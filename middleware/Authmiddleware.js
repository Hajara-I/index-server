const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
	const accessToken = req.header("accessToken");

	if (!accessToken) return res.json({ error: "This User is not Logged In!" });
	try {
		const validToken = verify(accessToken, "x7HKJrfQa3ZNmre");
		req.user = validToken;
		if (validToken) {
			return next();
		}
	} catch (err) {
		return res.json({ error: err });
	}
};

module.exports = { validateToken };
