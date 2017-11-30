import React from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';

export default class Saved extends React.component {
	render() {
		return(
			<Table hover>
				{this.props.update.savedData}
			</Table>
			)
	}
}