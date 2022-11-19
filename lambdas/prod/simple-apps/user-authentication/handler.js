const UserAuthentication = require('user-authentication');
const LambdaUtilities = require('lambda-utilities');

module.exports = {
	'handleReturnUserRegisterRequest': async (event, context) => {
		// attempt to do what was requested
		try {
			// assign result to constant
			const result = await UserAuthentication.registerUser(JSON.parse(event.body));
			// create a reponse object
			const responseObject = LambdaUtilities.returnResponseObject({
				'statusCode': 200,
				'payload': result,
				event,
				context,
			});
			// log the response object
			LambdaUtilities.log({
				'incomingObject': { responseObject },
			});
			// return the response object
			return responseObject;
			// if an error occurred
		} catch (error) {
			// create a reponse object
			const responseObject = LambdaUtilities.returnResponseObject({
				'statusCode': 200,
				'payload': error,
				event,
				context,
			});
			// log the response object
			LambdaUtilities.log({
				'incomingObject': { responseObject },
			});
			// return the response object
			return responseObject;
		}
	},
	'handleReturnUserVerifyRequest': async (event, context) => {
		// attempt to do what was requested
		try {
			// assign result to constant
			const result = await UserAuthentication.verifyToken(JSON.parse(event.body));
			// create a reponse object
			const responseObject = LambdaUtilities.returnResponseObject({
				'statusCode': 200,
				'payload': result,
				event,
				context,
			});
			// log the response object
			LambdaUtilities.log({
				'incomingObject': { responseObject },
			});
			// return the response object
			return responseObject;
			// if an error occurred
		} catch (error) {
			// create a reponse object
			const responseObject = LambdaUtilities.returnResponseObject({
				'statusCode': 200,
				'payload': error,
				event,
				context,
			});
			// log the response object
			LambdaUtilities.log({
				'incomingObject': { responseObject },
			});
			// return the response object
			return responseObject;
		}
	},
	'handleReturnUserLoginRequest': async (event, context) => {
		// attempt to do what was requested
		try {
			// assign result to constant
			const result = await UserAuthentication.loginUser(JSON.parse(event.body));
			// create a reponse object
			const responseObject = LambdaUtilities.returnResponseObject({
				'statusCode': 200,
				'payload': result,
				event,
				context,
			});
			// log the response object
			LambdaUtilities.log({
				'incomingObject': { responseObject },
			});
			// return the response object
			return responseObject;
			// if an error occurred
		} catch (error) {
			// create a reponse object
			const responseObject = LambdaUtilities.returnResponseObject({
				'statusCode': 200,
				'payload': error,
				event,
				context,
			});
			// log the response object
			LambdaUtilities.log({
				'incomingObject': { responseObject },
			});
			// return the response object
			return responseObject;
		}
	},
};
