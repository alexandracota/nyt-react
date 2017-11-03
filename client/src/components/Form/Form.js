import React from 'react';
// import SearchBtn from '../SearchBtn';

var styles = {
  fontSize: '25',
  padding: '25',
  textAlign: 'center',
  margin: '20'
};

const Form = () =>
	<div className = 'FormGroup'>
		<div className = 'FormControl' style={styles}>
			<div className = 'search'>
				Search
			</div>
			<div className = 'topic'>
				Topic
			</div>
			<div className='startYear'>
				Start Year
			</div>
			<div className = 'endYear'>
				End Year
			</div>
		</div>
	</div>

export default Form;