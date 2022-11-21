/* eslint-disable no-unused-vars */
import {
	registerUser,
} from '../lib/control.js';


const result = registerUser(JSON.parse("{\n    \"appID\": \"def123\",\n    \"username\": \"hi2@jbkr.me\",\n    \"password\": \"password\"\n}"));


console.log(result);
