import React, {Component} from "react";
import axios from "axios";

// Local imports
import Lights from "./Lights";

class Group extends Component {
	constructor(props) {
		super(props);
		const {params} = props.match;

		this.state = {
			group: {
				id: params.id,
				data: {},
			},
			selectedPage: 0,
		};
	}

	componentDidMount = () => {
		const {params} = this.props.match;
		this.FetchGroup(params.id);
	};

	FetchGroup = (id) => {
		axios
			.get(`${this.props.hueUrl}/groups/${id}`)
			.then((res) => {
				let group = this.state.group;
				group.data = res.data;
				this.setState({group});
			})
			.catch((err) => {});
	};

	render() {
		let group = this.state.group.data;
		let page = this.state.selectedPage;
		return (
			<div className="container">
				<h2 style={{float: "left", paddingLeft: "1em"}}>
					<i
						className="fas fa-arrow-left back-arrow"
						style={{cursor: "pointer"}}
						onClick={() => this.props.history.goBack()}
					/>{" "}
					Group - {group.name}
				</h2>
				<div className="flex">
					<div className="col">
						<h3>Categories</h3>
						<div className="options">
							<div className="option">Lights</div>
							<div className="option">Scenes</div>
						</div>
					</div>

					<div className="col-4">{page === 0 ? <Lights {...this.props} groupId={this.state.group.id} /> : ""}</div>
				</div>
			</div>
		);
	}
}

export default Group;
