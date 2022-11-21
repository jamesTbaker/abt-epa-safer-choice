import jwt from 'jsonwebtoken';

export const returnNewToken = (userInfo) => {
	// if user info is missing
	if (!userInfo) {
		// return null
		return null;
	}
	// return a new token that expires in 1 hour
	return jwt.sign(userInfo, process.env.jwtSecret, {
		expiresIn: '1h',
	});
};
export const returnTokenIsVerified = (appID, username, token) => {
	// return the result of verifying the token
	return jwt.verify(
		token,
		process.env.jwtSecret,
		(error, response) => {
			// if there is an error
			if (error) {
				// return a reponse object indicating that the token is not valid
				return {
					'verified': false,
					'message': 'Invalid token',
					error,
				};
			}
			// if the username does not match the username in the token
			if (response.username !== username) {
				// return a reponse object indicating that the token is not valid
				return {
					'verified': false,
					'message': 'Invalid user',
				};
			}
			// if the appID does not match the appID in the token
			if (response.appID !== appID) {
				// return a reponse object indicating that the token is not valid
				return {
					'verified': false,
					'message': 'Invalid appID',
				};
			}
			// return that the token is valid
			return {
				'verified': true,
			};
		}
	);
};
