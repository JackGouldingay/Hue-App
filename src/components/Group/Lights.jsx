import React, {Component} from "react";
import axios from "axios";

// Local imports
import Light from "../Light";

// CSS imports
import "../../css/Group/Light.css";

class Lights extends Component {
	constructor(props) {
		super(props);

		this.state = {
			group: {
				id: this.props.groupId,
			},
			lights: [],
		};
	}

	componentDidMount = () => {
		this.FetchLights(this.state.group.id);
	};

	FetchLights = (groupId) => {
		axios.get(`${this.props.hueUrl}/groups/${groupId}`).then((res) => {
			let lights = res.data.lights;
			this.setState({lights});
		});
	};

	render() {
		return (
			<div>
				<h3>Lights</h3>
				<div className="flex">
					<div className="col">
						<div className="lights-holder">
							{this.state.lights.map((id, i) => {
								return <Light key={i} hueUrl={this.props.hueUrl} id={id} />;
							})}
						</div>
					</div>
					<div className="col" />
				</div>
			</div>
		);
	}
}

export default Lights;
