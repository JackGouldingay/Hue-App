import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Local Imports
import "./css/App.css";
import "./css/Flex.css";
import "./css/Inputs.css";
import config from "./config/config.json";

// Component Imports
import Light from "./components/Light";
import Group from "./components/Group/Group";
import Groups from "./components/Groups";

class App extends Component {
	constructor() {
		super();

		this.state = {
			hueUrl: `http://${config["hue"]["address"]}/api/${config["hue"]["username"]}`,
		};
	}

	render() {
		return (
			<Router>
				<div className="App">
					<div className="main">
						<Link to="/">
							<h1 className="title">Electron App</h1>
						</Link>

						<Switch>
							<Route exact path="/" component={(props) => <Groups {...props} hueUrl={this.state.hueUrl} />} />

							<Route path="/group/:id" component={(props) => <Group {...props} hueUrl={this.state.hueUrl} />} />

							<Route path="/light/:id" component={(props) => <Light {...props} hueUrl={this.state.hueUrl} />} />
						</Switch>
					</div>
					<footer>
						<span>Icons provided by <a href="https://www.icons8.com">Icons 8</a></span>
					</footer>
				</div>


			</Router>
		);
	}
}

export default App;
