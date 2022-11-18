const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
	if (!userInfo) {
		return null;
	}

	return jwt.sign(userInfo, process.env.jwtSecret, {
		expiresIn: "1h",
	});
};

exports.verifyToken = (username, token) => {
	return jwt.verify(token, process.env.jwtSecret, (error, response) => {
		if (error) {
			return {
				verified: false,
				message: "Invalid token",
				error: error,
			};
		}

		if (response.username !== username) {
			return {
				verified: false,
				message: "Invalid user",
			};
		}

		return {
			verified: true,
			message: "verified",
		};
	});
};
