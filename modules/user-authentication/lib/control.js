import bcrypt from 'bcryptjs';
import {
	addUserToDB,
	returnUserFromDB,
	addAppToUserInDB,
} from './query.js';
import {
	returnNewToken,
	returnTokenIsVerified,
} from './token.js';

export const registerUser = async ({ appID, username, password }) => {
	// if any of the required fields are missing
	if (!appID || !username || !password) {
		// return a reponse object
		return {
			'success': false,
			'message': 'All fields are required',
		};
	}
	// otherwise
	else {
		// attempt to find the user in the db
		const userQueryResult = await returnUserFromDB(username);
		// if the user already exists and is registered for this app
		if (
			userQueryResult.success &&
			userQueryResult.item &&
			userQueryResult.item.registeredApps.includes(appID)
		) {
			// return a response object
			return {
				'success': false,
				'message': 'User already registered',
			};
		}
		// otherwise, if the user already exists but is not registered for this app
		else if (
			userQueryResult.success &&
			userQueryResult.item &&
			!userQueryResult.item.registeredApps.includes(appID)
		) {
			// create a new user object
			const user = {
				...userQueryResult.item,
			};
			// add the app to the user's registered apps
			user.registeredApps.push(appID);
			// update the user in the db
			const userUpdateResult = await addAppToUserInDB(user);
			// if the user was updated successfully
			if (userUpdateResult.success) {
				// return a response object
				return {
					'success': true,
					'message': 'User registered',
					username,
				};
			}
			// if the user was not updated successfully
			else {
				// return a response object
				return {
					'success': false,
					'message': 'User could not be registered',
				};
			}
		}
		// otherwise
		else {
			// hash the password
			const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
			// create the user object
			const user = {
				'username': username.toLowerCase(),
				'password': encryptedPassword,
				'registeredApps': [appID],
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
		}
	}
};
export const loginUser = async ({ appID, username, password }) => {
	// if any of the required fields are missing
	if (!appID || !username || !password) {
		// return a reponse object
		return {
			'success': false,
			'message': 'All fields are required',
		};
	}
	// attempt to find the user in the db
	const userQueryResult = await returnUserFromDB(username);
	// if the user was not found
	if (!userQueryResult.success || !userQueryResult.item) {
		// return a response object
		return {
			'success': false,
			'message': 'User not found',
		};
	}
	// otherwise
	else {
		// if the user is not registered for this app
		if (!userQueryResult.item.registeredApps.includes(appID)) {
			// return a response object
			return {
				'success': false,
				'message': 'User exists but not registered for this app',
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
			appID,
			username,
		};
		// generate a token
		const token = returnNewToken(userInfo);
		// return a response object
		return {
			'success': true,
			'user': userInfo,
			token,
		};
	}
};
export const verifyToken = async ({ appID, username, token }) => {
	// if any of the required fields are missing
	if (!appID || !username || !token) {
		// return a reponse object
		return {
			'success': false,
			'message': 'All fields are required',
		};
	}
	// attempt to verify the token
	const tokenVerificationResult = returnTokenIsVerified(appID, username, token);
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
