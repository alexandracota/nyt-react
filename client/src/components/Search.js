import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';

// import Query from "./Search/Query";
// import Results from "./Search/Results";

export default class Search extends React.Component {
	render() {
		return (
			<Form onSubmit={this.props.onSearch}>
				<FormGroup>
					<Label for ='topic'>Topic</Label>
					<Input
						type="text"
						required={true}
						onChange={this.props.topicChanged}
						value={this.props.topic}
						placeholder='Topic' />
				</FormGroup>
				<FormGroup>
					<Label for='startYear'>Start Year</Label>
					<Input
						type="number"
						min={1900}
						max={2017}
						required={true}
						onChange={this.props.startYearChanged}
						value={this.props.begin}
						placeholder="1967"/>
				</FormGroup>
				<FormGroup>
					<Label for ='endYear'>End Year</Label>
						<Input
							type="number"
							min={1900}
							max="2017"
							required={true}
							onChange={this.props.EndYearChanged}
							value={this.props.end}
							placeholder="1999" />
				</FormGroup>
				<Button>Submit</Button>
			</Form>

			)
	}
}