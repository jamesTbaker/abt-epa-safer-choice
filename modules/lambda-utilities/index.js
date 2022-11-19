/**
 * Various ancillary functions particular to running operations on AWS Lambda.
 * @module @jbkr/lambda-utilities
 */

import { DateTime } from 'luxon';

/**
 * @description Log the incoming object with a visual identifier and a more
 * convenient timestamp. Each object property will be logged separately, both
 * key and value.
 *
 * @param {Object} \{\} - Destructured parameters
 * @param {Object} \{\}.incomingObject - The object to be logged.
 *
 * @example @lang js
 * import { log } from '@jbkr/lambda-utilities';
 *
 * log({ 'incomingObject': { 'message': 'This is the message.' } });
 * // ----- September 20, 2021, 3:25 PM EDT -- message -- This is the message.
 */
export const log = ({ incomingObject }) => {
	// construct a datetime string
	const datetimeString = DateTime.now().setZone('America/New_York')
		.toLocaleString(DateTime.DATETIME_FULL);
	// for each object property key
	Object.keys(incomingObject).forEach((key) => {
		// log the key and the property value
		// eslint-disable-next-line no-console
		console.log(
			` ----- ${datetimeString} -- ${key} -- ` +
			JSON.stringify(incomingObject[key]),
		);
	});
};
/**
 * @description Construct, log, and return an AWS Lambda / API Gateway response
 * from some static values and the parameters we receive.
 *
 * @param {Object} \{\} - Destructured parameters
 * @param {Number} \{\}.statusCode - The HTTP status code.
 * @param {Number} \{\}.payload - Whatever data you want to send back. Functions
 * may set this to an error, if one occurs. The requester is responsible for
 * verifying that payload contains what they expect.
 * @param {Object} \{\}.event - The [AWS event](
 * https://docs.aws.amazon.com/whitepapers/latest/serverless-architectures-lambda/the-event-object.html).
 * @param {Number} \{\}.context - The [AWS context](
 * https://docs.aws.amazon.com/whitepapers/latest/serverless-architectures-lambda/the-context-object.html).
 * @returns {Object}
 */
export const returnResponseObject = ({
	statusCode,
	payload,
	event,
	context,
}) => {
	// construct a response
	const response = {
		statusCode,
		'headers': {
			'Access-Control-Allow-Origin': '*',
		},
		'body': JSON.stringify({
			payload,
			event,
			context,
		}),
	};
	/* // log the response
	log({
		'incomingObject': { response },
	}); */
	return response;
};
