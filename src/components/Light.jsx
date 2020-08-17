import React, { Component } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

// Local imports
import { ConvertColor } from "../modules/HueColor";

class Light extends Component {
	constructor(props) {
		super(props);

		this.state = {
			light: {
				id: props.id,
				data: {},
				isLoaded: false,
			},
			form: {
				on: true,
				bri: 0 / 254,
			},
		};
	}

	componentDidMount = () => {
		this.FetchLight(this.state.light.id);
		// setInterval(this.FetchLight(this.state.light.id), 30000);
	};

	FetchLight = (id) => {
		axios.get(`${this.props.hueUrl}/lights/${id}`).then((res) => {
			let light = this.state.light;
			let form = this.state.form;
			light.data = res.data;
			light.isLoaded = true;
			form.on = light.data.state.on;
			form.bri = light.data.state.bri / 254;
			this.setState({ light, form });
		});
	};

	HandleChange = (e) => {
		let form = this.state.form;
		form.bri = e.target.value;
		this.setState({ form });
	};

	HandleColorChange = (e) => {
		console.log(e.target);
	};

	UpdateLight = () => {
		const form = this.state.form;
		const id = this.state.light.id;
		const state = {
			on: form.on,
			bri: Math.round(form.bri * 254),
		};

		axios.put(`${this.props.hueUrl}/lights/${id}/state`, state);
	};

	render() {
		const light = this.state.light.data;
		const form = this.state.form;
		const { r, g, b } = ConvertColor(light.state);
		const boxShadow = `1px 1px 5px 1px rgba(${r}, ${g}, ${b}, ${form.bri})`;
		const linearGradient = `linear-gradient(to right, rgba(${r},${g},${b}, 0.1), rgba(${r},${g},${b}, 1))`;

		return (
			<div className="light-item" style={{ boxShadow }}>
				{this.state.light.isLoaded === false ? (
					<CircularProgress />
				) : (
						<div>
							<h4>{light.name}</h4>

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
									onMouseUp={this.UpdateLight}
									style={{ background: linearGradient }}
								/>
							</div>

							{/* <input type="color" name="colorPicker" className="colorPicker" onChange={this.HandleColorChange} /> */}
						</div>
					)}
			</div>
		);
	}
}

export default Light;
