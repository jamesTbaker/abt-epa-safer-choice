import jwt from 'jsonwebtoken';

export const returnNewToken = (userInfo) => {
	console.log(`returnNewToken userInfo = ${JSON.stringify(userInfo)}`);
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
export const returnTokenIsVerified = (username, token) => {
	console.log(`username = ${username}`);
	console.log(`token = ${token}`);
	console.log(`process.env.jwtSecret = ${process.env.jwtSecret}`);
	// return the result of verifying the token
	return jwt.verify(
		token,
		process.env.jwtSecret,
		(error, response) => {
			console.log(`jwt Error = ${error}`);
			console.log(`jwt Response = ${JSON.stringify(response)}`);
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
			// return that the token is valid
			return {
				'verified': true,
			};
		}
	);
};
