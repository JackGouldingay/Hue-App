import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Local imports
import "../css/Groups.css";
import { ConvertColor } from "../modules/HueColor";
import flashlight_light from "../images/icons/flashlight-light.png";
import flashlight_dark from "../images/icons/flashlight-dark.png";

class Group extends Component {
	constructor(props) {
		super(props);

		let item = props.item;

		this.state = {
			group: {
				id: props.id,
				data: item,
				isUpdating: false,
			},
			form: {
				on: props.item.action.on,
				bri: props.item.action.bri / 254,
			},
		};

	}

	HandleChange = (e) => {
		let form = this.state.form;
		form.bri = e.target.value;
		this.setState({ form });
	};

	HandleClick = (e) => {
		if (e.target.id === "flashlight") {
			let form = this.state.form;
			form.on = !form.on;
			this.setState({ form });
			this.UpdateLights();
		}
	}

	UpdateLights = () => {
		let form = this.state.form;
		let state = {
			on: form.on,
			bri: Math.round(form.bri * 254),
		};

		axios.put(`${this.props.hueUrl}/groups/${this.state.group.id}/action`, state);
	};

	render() {
		const id = this.state.group.id;
		const item = this.state.group.data;
		const form = this.state.form;
		const { r, g, b } = ConvertColor(item.action);
		const boxShadow = `1px 1px 5px 1px rgba(${r}, ${g}, ${b}, ${!form.on ? 0 : form.bri})`;
		const linearGrdient = `linear-gradient(to right, rgba(${r},${g},${b}, 0.1), rgba(${r},${g},${b}, 1))`;

		return (
			<div className="group-item" style={{ boxShadow }}>
				<h2>{item.name}</h2>
				<span>Lights {item.lights.length}</span>

				<div className="range-div">
					<span>{Math.round(form.bri * 100)}%</span>
					<input
						type="range"
						name="brightness"
						className="brightnessRange"
						min="0"
						max="1"
						step="0.01"
						value={form.bri}
						onChange={this.HandleChange}
						onMouseUp={this.UpdateLights}
						style={{ background: linearGrdient }}
					/>
				</div>

				<div className="buttons">
					<Link to={`/group/${id}`}>
						<div className="view-group">View Group</div>
					</Link>
					<img src={form.on ? flashlight_light : flashlight_dark} className="flashlight" data-on={form.on ? true : false} alt="Flashlight" id="flashlight" onClick={this.HandleClick} />
				</div>
			</div>
		);
	}
}

export default Group;
