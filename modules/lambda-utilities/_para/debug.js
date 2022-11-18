/* eslint-disable no-unused-vars */
import {
	log,
	createResponse,
} from '../index.js';


/* const result = await log({
	'incomingObject': { 'testKey': 'testValue' },
}); */
const result = await createResponse({
	'statusCode': 200,
	'payload': 'testPayload',
	'event': 'testEvent',
	'context': 'testContext',
});


console.log(result);
