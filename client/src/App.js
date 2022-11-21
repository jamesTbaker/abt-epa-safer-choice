import { useState } from 'react';
import '@shoelace-style/shoelace/dist/themes/light.css';
import { SlButton, SlSelect, SlIcon, SlInput, SlMenuItem, SlDetails, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import './App.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/');

export const AppParent = () => {
	const [appID, setAppID] = useState('1');
	const [appAction, setAppAction] = useState('register');
	const handleAppIDChange = (event) => {
		setAppID(event.target.value);
	};
	const handleAppActionChange = (event) => {
		setAppAction(event.target.value);
	};
	/* const [notes, setNotes] = useState('');
	useEffect(() => {
		notionClient.users.list({}).then(
			({ results }) => {
				console.log('results');
				console.log(results);
				setNotes(results);
			}
		);
	}, []); */
	return (
		<div
			id="app-parent"
			className="abt-theme-light"
		>
			<h1>Apps Parent</h1>
			<div id="notes-container">
				<SlDetails summary="Notes">
					<h3>Meta</h3>
					<ul>
						<li>The architecture is a service called <b>simple-apps</b>, inside of which is an app
							called <b>user-authenticaction</b>
						</li>
						<li>Processes run in Node.js on AWS Lambda and store data in DynamoDB</li>
						<li>Permissions for deployment user and runtime role do no currently adhere to
							principle of least privilege</li>
						<li>Created in a throwaway AWS account that will be deleted</li>
						<li>AWS config is in code; only one env variable, the hashing value, will need to be
							created again in a new home</li>
						<li>Code is in <a href="https://github.com/jamesTbaker/abt-epa-safer-choice">a personal
							GitHub repo</a>, at the moment; feel free to review</li>
						<li>Uses Serverless framework to specify config</li>
					</ul>
					<h3>Current Features</h3>
					<ul>
						<li>Register User (for a specified app)
							<ul>
								<li>Password is hashed, of course</li>
								<li>Having an AppID allows us to use the same system for multiple simple apps
									but restrict access on a per-app basis; i.e., one account doesn&apos;t give you access to all the
									apps, but your account is still unique in the database</li>
								<li>Returns confirmation or error</li>
							</ul>
						</li>
						<li>Login User (authenticate previously-registered user for a specified app)
							<ul>
								<li>Returns confirmation + JWT access token good for one hour, or error</li>
							</ul>
						</li>
						<li>Verify User (verify that previously-authenticated user&apos;s token is still valid, e.g.,
							before allowing access to something restricted)
							<ul>
								<li>Returns confirmation + same (not updated) JWT token, or error</li>
							</ul>
						</li>
					</ul>
					<h3>Definitely-Needed Features</h3>
					<ul>
						<li>Forgotten credentials instructions and corresponding processes</li>
						<li>Field validation</li>
						<li>Error handling</li>
						<li>Protect API endpoints from misuse</li>
					</ul>
					<h3>Potential Features</h3>
					<ul>
						<li>Password complexity requirements</li>
						<li>Refresh token, so that continued use of the app prevents being logged out</li>
						<li>Verify email address during registration</li>
						<li>MFA</li>
						<li>Allowing social logins (E.g., <b>Sign up with your Google account</b>)</li>
						<li>Customizable (per-app) error messages</li>
						<li>Allow username other than email address</li>
						<li>Allow user to update account</li>
						<li>Allow user to delete account (unregister for specified app)</li>
						<li>Allow collecting additional data on registration</li>
						<li>Allow people who don't realize they're using two separate Abt simple apps to register the same username and a different password - because they won't know that their username / email address is already in the db with a different password</li>
						<li>Allow updating user account data</li>
					</ul>
				</SlDetails>
			</div >
			<div id="app-action-selector">
				<h3>Choose app and process</h3>
				<div id="app-action-selector__element-container">
					<SlSelect
						label="App ID"
						value={appID}
						onSlChange={handleAppIDChange}
					>
						<SlMenuItem value="1">App 1</SlMenuItem>
						<SlMenuItem value="2">App 2</SlMenuItem>
					</SlSelect>
				</div>
				<div id="app-action-selector__element-container">
					<SlSelect
						label="Process"
						value={appAction}
						help-text="For now, must be performed in order, e.g., log in after signing up, etc."
						onSlChange={handleAppActionChange}
					>
						<SlMenuItem value="register">Register</SlMenuItem>
						<SlMenuItem value="login">Log In</SlMenuItem>
						<SlMenuItem value="verify">Verify</SlMenuItem>
					</SlSelect>
				</div>
			</div>
			<App
				appID={appID}
				appAction={appAction}
			/>
		</div >
	);


};
const App = ({ appID, appAction }) => {
	return (
		<>
			{
				appAction === 'register' &&
				<Register
					appID={appID}
					key={`register-${appID}`}
				/>
			}
			{
				appAction === 'login' &&
				<Login
					appID={appID}
					key={`login-${appID}`}
				/>}
			{
				appAction === 'verify' &&
				<Verify
					appID={appID}
					key={`verify-${appID}`}
				/>}
		</>
	);
};
const Register = ({ appID }) => {
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [registered, setRegistered] = useState(false);
	const [registrationError, setRegistrationError] = useState('');
	const attemptRegistration = async () => {
		const response = await fetch('https://gdm3dzyyac.execute-api.us-east-1.amazonaws.com/prod/simple-apps/user-authentication/register', {
			method: 'POST',
			body: JSON.stringify({
				appID,
				'username': emailAddress,
				password
			})
		});
		const data = await response.json();
		console.log(data);
		if (data.payload.success) {
			setRegistered(true);
		} else {
			setRegistrationError(data.payload.message);
		}
	};
	if (registered) {
		return (
			<div id="app" className={`app-id-${appID} app-action-register`}>
				<h2>App: {appID}</h2>
				<h3>Register</h3>
				<p>Registered!</p>
			</div>
		);
	}
	if (registrationError) {
		return (
			<div id="app" className={`app-id-${appID} app-action-register`}>
				<h2>App: {appID}</h2>
				<h3>Register</h3>
				<p>Registration error: {registrationError}</p>
			</div>
		);
	}
	return (
		<div id="app" className={`app-id-${appID} app-action-register`}>
			<h2>App: {appID}</h2>
			<h3>Register</h3>
			<div className="abt-form-element">
				<SlInput
					label="Email Address"
					value={emailAddress}
					onSlInput={(e) => setEmailAddress(e.target.value)}
					required
				>
					<SlIcon slot="prefix" name="envelope"></SlIcon>
				</SlInput>
			</div>
			<div className="abt-form-element">
				<SlInput
					label="Password"
					value={password}
					onSlInput={(e) => setPassword(e.target.value)}
					password-toggle
					required
				>
					<SlIcon slot="prefix" name="lock"></SlIcon>
				</SlInput>
			</div>
			<div className="abt-form-element">
				<SlButton
					type="submit"
					data-container="filled"
					data-tone="default"
					onClick={attemptRegistration}
				>
					Register
					<SlIcon slot="suffix" name="door-open"></SlIcon>
				</SlButton>
			</div>
		</div>
	);
};
const Login = ({ appID }) => {
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [loginError, setLoginError] = useState('');
	const [accessToken, setAccessToken] = useState('');
	const attemptLogin = async () => {
		const response = await fetch('https://gdm3dzyyac.execute-api.us-east-1.amazonaws.com/prod/simple-apps/user-authentication/login', {
			method: 'POST',
			body: JSON.stringify({
				appID,
				'username': emailAddress,
				password
			})
		});
		const data = await response.json();
		console.log(data);
		if (data.payload.success) {
			setLoggedIn(true);
			setAccessToken(data.payload.token);
		} else {
			setLoginError(data.payload.message);
		}
	};
	if (loggedIn) {
		return (
			<div id="app" className={`app-id-${appID} app-action-log-in`}>
				<h2>App: {appID}</h2>
				<h3>Log In</h3>
				<p className="login-success">You've Logged In!</p>
				<SlTextarea
					resize="auto"
					label="Copy this access token to use in verifying your login"
					value={accessToken}
				>{accessToken}</SlTextarea>
			</div >
		);
	}
	if (loginError) {
		return (
			<div id="app" className={`app-id-${appID} app-action-log-in`}>
				<h2>App: {appID}</h2>
				<h3>Log In</h3>
				<p>Login error: {loginError}</p>
			</div>
		);
	}
	return (
		<div id="app" className={`app-id-${appID} app-action-log-in`}>
			<h2>App: {appID}</h2>
			<h3>Log In</h3>
			<div className="abt-form-element">
				<SlInput
					label="Email Address"
					value={emailAddress}
					onSlInput={(e) => setEmailAddress(e.target.value)}
					required
				>
					<SlIcon slot="prefix" name="envelope"></SlIcon>
				</SlInput>
			</div>
			<div className="abt-form-element">
				<SlInput
					label="Password"
					value={password}
					onSlInput={(e) => setPassword(e.target.value)}
					password-toggle
					required
				>
					<SlIcon slot="prefix" name="lock"></SlIcon>
				</SlInput>
			</div>
			<div className="abt-form-element">
				<SlButton
					type="submit"
					data-container="filled"
					data-tone="default"
					onClick={attemptLogin}
				>
					Log In
					<SlIcon slot="suffix" name="door-open"></SlIcon>
				</SlButton>
			</div>
		</div>
	);
};
const Verify = ({ appID }) => {
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [verfied, setVerified] = useState(false);
	const [verificationError, setVerificationError] = useState('');
	const [accessToken, setAccessToken] = useState('');
	const attemptVerficiation = async () => {
		const response = await fetch('https://gdm3dzyyac.execute-api.us-east-1.amazonaws.com/prod/simple-apps/user-authentication/verify', {
			method: 'POST',
			body: JSON.stringify({
				appID,
				'username': emailAddress,
				'token': accessToken,
			})
		});
		const data = await response.json();
		console.log(data);
		if (data.payload.success) {
			setVerified(true);
		} else {
			setVerificationError(data.payload.message);
		}
	};
	if (verfied) {
		return (
			<div id="app" className={`app-id-${appID} app-action-log-in`}>
				<h2>App: {appID}</h2>
				<h3>Log In Verification</h3>
				<p>Your Login is Verfied!</p>
				<SlTextarea
					resize="auto"
					label="This token was verfied against your username, the appID, and the time since you logged in."
					value={accessToken}
				>{accessToken}</SlTextarea>
			</div >
		);
	}
	if (verificationError) {
		return (
			<div id="app" className={`app-id-${appID} app-action-log-in`}>
				<h2>App: {appID}</h2>
				<h3>Log In Verification</h3>
				<p>Login Verification Error: {verificationError}</p>
			</div>
		);
	}
	return (
		<div id="app" className={`app-id-${appID} app-action-log-in`}>
			<h2>App: {appID}</h2>
			<h3>Log In Verification</h3>
			<div className="abt-form-element">
				<SlInput
					label="Email Address"
					value={emailAddress}
					onSlInput={(e) => setEmailAddress(e.target.value)}
					required
				>
					<SlIcon slot="prefix" name="envelope"></SlIcon>
				</SlInput>
			</div>
			<div className="abt-form-element">
				<SlInput
					label="Password"
					value={password}
					onSlInput={(e) => setPassword(e.target.value)}
					password-toggle
					required
				>
					<SlIcon slot="prefix" name="lock"></SlIcon>
				</SlInput>
			</div>
			<div className="abt-form-element">
				<SlTextarea
					resize="auto"
					label="Token"
					value={accessToken}
					help-text="This is the token you were given when you logged in."
					onSlInput={(e) => setAccessToken(e.target.value)}

				>{accessToken}</SlTextarea>
			</div>
			<div className="abt-form-element">
				<SlButton
					type="submit"
					data-container="filled"
					data-tone="default"
					onClick={attemptVerficiation}
				>
					Verify Log In
					<SlIcon slot="suffix" name="door-open"></SlIcon>
				</SlButton>
			</div>
		</div>
	);
};
