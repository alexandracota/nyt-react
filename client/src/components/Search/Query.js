import React from "react";

var Query = React.createClass({

	//Set initial variables
	getInitialState: function() {
		return{
			search: "",
			start: "",
			end: ""
		};
	},

	//Register any changes to the textbox
	handleChange: function(event) {
		console.log("change to textbox");

		//Capture any changes in text and set new state
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	},

	//Send search terms to the parent search component
	handleSubmit: function(event) {
		event.preventDefault();
		console.log("Clicked");
		this.props.updateSearch(this.state.search, this.state.start, this.state.end);
	},

	//Render the Query component
	render: function() {
		return (
			<div className="main-container">
				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h1 className="panel-title">
									Query
								</h1>
							</div>
							<div className="panel-body">
								{/*Associate text box inputs with the state values*/}
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<h4>Topic</h4>
										<input type="text" value={this.state.search} className="form-control" id="search" onChange={this.handleChange} required />
										
										<h4>Start Year</h4>
										<input type="number" value={this.state.start} className="form-control" id="start" onChange={this.handleChange} required />

										<h4>End Year</h4>
										<input type="number" value={this.state.end} className="form-control" id="end" onChange={this.handleChange} required />

									</div>

									<div className="pull-right">
										<button type="submit" className="btn btn-danger">
											<h4>Submit</h4>
										</button>
									</div>
								</form>

							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}

});

export default Query;