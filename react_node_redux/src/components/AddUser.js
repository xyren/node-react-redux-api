import React, { Component } from 'react'
import '../css/App.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage';

import axios from 'axios';

import { Button, 
	TextField,
	AppBar,
	Toolbar,
	Typography
} from '@material-ui/core';

const { API_URL, API_KEY } = require('../config/index');

class AddUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fname: '',
			lname: '',
			contact: '',
		};
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextState.fname !== this.state.fname) {
			return true;
		}
		if (nextState.lname !== this.state.lname) {
			return true;
		}
		if (nextState.contact !== this.state.contact) {
			return true;
		}
		return false;
	}

	handleSubmit = () => {
		const { fname, lname, contact } = this.state;

		if (fname === "" || 
			lname === "" || 
			contact === ""
			)
			return false;

		const formData = {
			fname: fname,
			lname: lname,
			contact: contact,
		};

		axios.put(API_URL + '/person/add/',  formData,
		{ 
			headers: {
				"Accept": "application/json",
				"x-api-key": API_KEY
			}
		}).then(res => {
			// console.log('submitted');
			// redirect if success
			window.location = '/';
		})

		return false;
	};

	render() {

		const { userId } = this.props.match.params;
		const { fname, lname, contact } = this.state;
			
		return (
			<div className="App">
				<AppBar position="fixed">
					<Toolbar>
						<Typography variant="h6" className="rtert">
							Add New User: ID  { userId}
						</Typography>
						<Button color="inherit" component={Link} to="/" className="button-back" variant="outlined" >Back</Button>
					</Toolbar>
				</AppBar>
				<header className="App-header">

					<div>
						<form action="#">
							<TextField id="outlined-uncontrolled"
								label="Firstname"
								value={fname}
								onChange={e => this.setState({ fname: e.target.value })}
								className="form-control"
								margin="normal"
								variant="outlined"
								required={true}
							/>

							<TextField id="outlined-uncontrolled"
								label="Lastname"
								value={lname}
								onChange={e => this.setState({ lname: e.target.value })}
								className="form-control"
								margin="normal"
								variant="outlined"
								required
							/>

							<TextField id="outlined-uncontrolled"
								label="Contact No"
								value={contact}
								onChange={e => this.setState({ contact: e.target.value })}
								className="form-control"
								margin="normal"
								variant="outlined"
								required={true}
							/>

							<Button variant="contained" 
								type="submit" 
								color="default" 
								size="large" 
								onClick={this.handleSubmit}>
								Submit
							</Button>

						</form>
					</div>
				</header>
			</div>
		)
	}

}

const mapStateToProps = (state, ownProps) => ({
	users: state.users
})

export default connect(mapStateToProps)(AddUser);
