import React, {Component} from "react";

class ColorPicker extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	HandleColorInput = (e) => {};

	render() {
		return (
			<div style={{textAlign: "center"}}>
				<input type="text" id="hex" />
				<input type="color" id="color" onInput={this.HandleColorInput} />
			</div>
		);
	}
}

export default ColorPicker;
