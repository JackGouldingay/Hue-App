import React, {Component} from "react";
import axios from "axios";
import {CircularProgress} from "@material-ui/core";

// Local imports
import "../css/Groups.css";
import Group from "./Group";

class Groups extends Component {
	constructor(props) {
		super(props);

		this.props = props;

		this.state = {
			groups: {
				data: [],
				isLoaded: false,
			},
		};
	}

	componentDidMount = () => {
		this.FetchGroups();
	};

	FetchGroups = () => {
		axios.get(`${this.props.hueUrl}/groups`).then((res) => {
			let data = [];
			Object.values(res.data).forEach((item, i) => {
				item.id = i + 1;
				data.push(item);
			});

			this.setState({groups: {data, isLoaded: true}});
		});
	};

	render() {
		let groups = this.state.groups.data;

		return (
			<div className="container">
				<div className="flex">
					<div className="col">
						<h2 className="flex-horizontal-center">Groups</h2>
					</div>
				</div>

				<div className="flex">
					<div className="col" />
					<div className="col">
						<div className="groups-holder">
							{!this.state.groups.isLoaded ? (
								<CircularProgress />
							) : (
								groups.map((item, i) => {
									return <Group id={item.id} item={item} hueUrl={this.props.hueUrl} key={i} />;
								})
							)}
						</div>
					</div>
					<div className="col" />
				</div>
			</div>
		);
	}
}

export default Groups;
