import { useState } from 'react';
import '@shoelace-style/shoelace/dist/themes/light.css';
import { SlButton } from '@shoelace-style/shoelace/dist/react';
import { SlIcon } from '@shoelace-style/shoelace/dist/react';
import { SlInput } from '@shoelace-style/shoelace/dist/react';
import './App.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/');

function App() {
	const appID = 'epaSaferChoiceSocial';
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [authenticated, setAuthenticated] = useState(false);
	const [auenthicationError, setAuenthicationError] = useState(false);
	const attemptAuthentication = () => {
		alert('attempting authentication');
	};
	if (authenticated) {
		return (
			<div id="app" className="abt-theme-light">
				<h1>Testerino</h1>
				<h2>Authenticated!</h2>
			</div>
		);
	} else {
		return (
			<div id="app" className="abt-theme-light">
				<h1>Testerino</h1>
				<h2>Log In</h2>
				<form id="login-form" action="/login" method="post">
					<div class="abt-form-element">
						<SlInput
							label="Email Address"
							value={emailAddress}
							onSlInput={(e) => setEmailAddress(e.target.value)}
							help-text="The email address with which you signed up."
							required
						>
							<SlIcon slot="prefix" name="envelope"></SlIcon>
						</SlInput>
					</div>
					<div class="abt-form-element">
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
					<div class="abt-form-element">
						<SlButton
							type="submit"
							data-container="filled"
							data-tone="default"
							onClick={attemptAuthentication}
						>
							Log In
							<SlIcon slot="suffix" name="door-open"></SlIcon>
						</SlButton>
					</div>
				</form>
			</div>
		);
	}
}

export default App;
