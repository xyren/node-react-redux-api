import React, { Component } from 'react'
import '../css/App.css'
import { connect } from 'react-redux'
import fetchUsersApi from '../actions/fetchUsersApi'
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

class EditUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: 0,
			fname: '',
			lname: '',
			contact: '',
		};
	}

	componentDidMount() {
	  	const {users}	= this.props;
	  	const { userId } = this.props.match.params;

	  	// if store is empty
	    if (users.length === 0){
			this.props.fetchUsersApi();

			this.setState({ userId: userId });

	    } else {
	    	// filter the store based on request
	  		let found = users.filter(t => t.id == userId);
	  		if (found.length === 0)
			  	return null;

		  	this.setState({ 
		 		userId: userId,
		 		fname: found[0].firstname,
		 		lname: found[0].lastname,
		 		contact: found[0].contact_no
		 	});
	    }
	}

	componentWillReceiveProps(newProps) {
		const {users}	= this.props;

		if(users !== newProps.users) {

			// filter the store after api request
			if (newProps.users.length !== 0){

				const { userId } = newProps.match.params;

				let found = newProps.users.filter(t => t.id == userId);
				if (found.length === 0){
					return null;
				}

				this.setState({ 
					userId: userId,
					fname: found[0].firstname,
					lname: found[0].lastname,
					contact: found[0].contact_no
				});
			}
		}
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
		if (nextState.userId !== this.state.userId) {
			return true;
		}
		return false;
	}

	handleSubmit = () => {
		const { userId, fname, lname, contact } = this.state;

		if (userId === 0 || 
			fname === "" || 
			lname === "" || 
			contact === ""
			)
			return false;

		const formData = {
			fname: fname,
			lname: lname,
			contact: contact,
		};

		axios.put(API_URL + '/person/edit/' + userId,  formData,
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
		const {users} = this.props;

		// empty data verification
		if (fname === ""){
			if (users.length !== 0) {
				let found = users.filter(t => t.id == userId);
				if (found.length === 0){
					return <ErrorPage />;
				}
			}
			return null;
		}
			
		return (
			<div className="App">
				<AppBar position="fixed">
					<Toolbar>
						<Typography variant="h6" className="rtert">
							Edit: ID  { userId}
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

export default connect(mapStateToProps, { fetchUsersApi })(EditUser);
