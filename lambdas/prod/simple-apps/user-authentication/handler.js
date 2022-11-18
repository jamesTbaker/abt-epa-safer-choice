const UserAuthentication = require('user-authentication');
const LambdaUtilities = require('lambda-utilities');

module.exports = {
	'HandleReturnUserRegisterRequest': async (event, context) => {
		// attempt to do what was requested
		try {
			// assign result to constant
			const result = await UserAuthentication.register(JSON.parse(event.body));
			// respond with the result
			return LambdaUtilities.createResponse({
				'statusCode': 200,
				'payload': result,
				event,
				context,
			});
			// if an error occurred
		} catch (error) {
			// respond with corresponding information
			return LambdaUtilities.createResponse({
				'statusCode': 500,
				'payload': error,
				event,
				context,
			});
		}
	},
	'HandleReturnUserVerifyRequest': async (event, context) => {
		// attempt to do what was requested
		try {
			// assign result to constant
			const result = await UserAuthentication.verify(JSON.parse(event.body));
			// respond with the result
			return LambdaUtilities.createResponse({
				'statusCode': 200,
				'payload': result,
				event,
				context,
			});
			// if an error occurred
		} catch (error) {
			// respond with corresponding information
			return LambdaUtilities.createResponse({
				'statusCode': 500,
				'payload': error,
				event,
				context,
			});
		}
	},
	'HandleReturnUserLoginRequest': async (event, context) => {
		// attempt to do what was requested
		try {
			// assign result to constant
			const result = await UserAuthentication.login(JSON.parse(event.body));
			// respond with the result
			return LambdaUtilities.createResponse({
				'statusCode': 200,
				'payload': result,
				event,
				context,
			});
			// if an error occurred
		} catch (error) {
			// respond with corresponding information
			return LambdaUtilities.createResponse({
				'statusCode': 500,
				'payload': error,
				event,
				context,
			});
		}
	},
};
