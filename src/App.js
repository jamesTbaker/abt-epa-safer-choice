import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './App.css';

function App() {
	return (
		<div id="app" className="abt-theme-light">
			<h1>Testerino</h1>
			<h2>Log In</h2>
			<form id="login-form" action="/login" method="post">
				<div class="abt-form-element">
					<sl-input label="Email Address" help-text="The email address with which you signed up." required>
						<sl-icon slot="prefix" name="envelope"></sl-icon>
					</sl-input>
				</div>
				<div class="abt-form-element">
					<sl-input label="Password" password-toggle clearable required>
						<sl-icon slot="prefix" name="lock"></sl-icon>
					</sl-input>
				</div>
				<div class="abt-form-element">
					<sl-button
						variant="primary"
						type="submit"
						data-container="filled"
						data-tone="default"
					>
						Log In
						<sl-icon slot="suffix" name="door-open"></sl-icon>
					</sl-button>
				</div>
			</form>
		</div>
	);
}

export default App;
