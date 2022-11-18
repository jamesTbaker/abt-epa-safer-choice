/*
const registerService = require("./functions/register");
const loginService = require("./functions/login");
const verifyService = require("./functions/verify");
const util = require("./helpers/utils/util");
exports.register = registerService.register;
exports.login = loginService.login;
exports.verify = verifyService.verify;
exports.buildResponse = util.buildResponse;
 */
export {
	registerUser,
	loginUser,
	verifyToken,
} from './lib/control.js';
