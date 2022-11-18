import bcrypt from 'bcryptjs';
import {
	addUserToDB,
	returnUserFromDB,
} from './query.js';
import {
	returnNewToken,
	returnTokenIsVerified,
} from './token.js';

export const registerUser = async ({ name, username, password }) => {
	// if any of the required fields are missing
	if (!username || !password || !name) {
		// return a reponse object
		return {
			'success': false,
			'message': 'All fields are required',
		};
	}
	// attempt to find the user in the db
	const userQueryResult = await returnUserFromDB(username);
	// if the user was found
	if (userQueryResult.success && userQueryResult.item) {
		// return a response object
		return {
			'success': false,
			'message': 'User already exists',
		};
	}
	// hash the password
	const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
	// create the user object
	const user = {
		'name': name,
		'username': username.toLowerCase(),
		'password': encryptedPassword,
	};
	// attempt to save the user to the db
	const userSaveResult = await addUserToDB(user);
	// if the user was not saved
	if (!userSaveResult.success) {
		// return a response object
		return {
			'success': false,
			'message': 'Server error',
		};
	}
	// return a response object
	return {
		'success': true,
		username,
	};
};
export const loginUser = async ({ username, password }) => {
	console.log(`username = ${username}`);
	console.log(`password = ${password}`);
	// if any of the required fields are missing
	if (!username || !password) {
		// return a reponse object
		return {
			'success': false,
			'message': 'All fields are required',
		};
	}
	// attempt to find the user in the db
	const userQueryResult = await returnUserFromDB(username);
	console.log(`userQueryResult = ${JSON.stringify(userQueryResult)}`);
	// if the user was not found
	if (!userQueryResult.success || !userQueryResult.item) {
		// return a response object
		return {
			'success': false,
			'message': 'User not found',
		};
	}
	// if the password does not match
	if (!bcrypt.compareSync(password, userQueryResult.item.password)) {
		// return a response object
		return {
			'success': false,
			'message': 'Incorrect password',
		};
	}
	// construct user info object
	const userInfo = {
		username: userQueryResult.item.username,
		name: userQueryResult.item.name,
	};
	console.log(`control.js userInfo = ${userInfo}`);
	// generate a token
	const token = returnNewToken(userInfo);
	// return a response object
	return {
		'success': true,
		'user': userInfo,
		token,
	};
};
export const verifyToken = async ({ username, token }) => {
	// if any of the required fields are missing
	if (!username || !token) {
		// return a reponse object
		return {
			'success': false,
			'message': 'All fields are required',
		};
	}
	// attempt to verify the token
	const tokenVerificationResult = returnTokenIsVerified(username, token);
	console.log(`tokenVerificationResult = ${tokenVerificationResult}`);
	// if the token is not verified and there is an error
	if (
		!tokenVerificationResult.verified &&
		tokenVerificationResult.error
	) {
		// return a response object
		return {
			'success': false,
			'message': tokenVerificationResult.message,
			'error': tokenVerificationResult.error,
		};
	}
	// if the token is not verified and there is not an error
	if (
		!tokenVerificationResult.verified &&
		!tokenVerificationResult.error
	) {
		// return a response object
		return {
			'success': false,
			'message': tokenVerificationResult.message,
		};
	}
	// return a response object
	return {
		'success': true,
		username,
		token,
	};
};
