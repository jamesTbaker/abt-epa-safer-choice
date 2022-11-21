import aws from 'aws-sdk';

// configure AWS region
aws.config.update({ region: 'us-east-1' });
// create a new DynamoDB document client
const dbClient = new aws.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
// set the table name
const userTableName = 'simple-apps--users';

export const returnUserFromDB = async (username) => {
	// set the params for the db query
	const params = {
		TableName: userTableName,
		Key: {
			username: username,
		},
	};
	// return a promise that will be resolved with the user data or an error
	return await dbClient
		// query the db table
		.get(params)
		// immediately return a promise
		.promise()
		// when the promise is resolved or rejected
		.then(
			// if the promise was resolved with the user data, return it
			(response) => ({
				'success': true,
				'item': response.Item,
			}),
			// if the promise was rejected with an error, return it
			(error) => ({
				'success': false,
				error,
			})
		);
};
export const addUserToDB = async (user) => {
	// set the params for the db query
	const params = {
		TableName: userTableName,
		Key: {
			username: user.username,
		},
		Item: user,
	};
	// return a promise that will be resolved with a success or error message
	return await dbClient
		// query the db table
		.put(params)
		// immediately return a promise
		.promise()
		// when the promise is resolved or rejected
		.then(
			// if the promise was resolved with the user data, return it
			(response) => ({
				'success': true,
				response,
			}),
			// if the promise was rejected with an error, return it
			(error) => ({
				'success': false,
				error,
			})
		);
};
export const addAppToUserInDB = async (user) => {
	// set the params for the db query
	const params = {
		TableName: userTableName,
		Key: {
			username: user.username,
		},
		UpdateExpression: `set registeredApps = :value`,
		ExpressionAttributeValues: {
			':value': user.registeredApps,
		},
		ReturnValues: 'UPDATED_NEW'
	}
	// return a promise that will be resolved with a success or error message
	return await dbClient
		// query the db table
		.update(params)
		// immediately return a promise
		.promise()
		// when the promise is resolved or rejected
		.then(
			// if the promise was resolved with the user data, return it
			(response) => ({
				'success': true,
				response,
			}),
			// if the promise was rejected with an error, return it
			(error) => ({
				'success': false,
				error,
			})
		);
};
