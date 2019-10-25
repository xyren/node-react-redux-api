import React, { Component } from 'react'
import UserList from './UserList'
import '../css/App.css'
import { connect } from 'react-redux'
import fetchUsersApi from '../actions/fetchUsersApi'

import { Link } from 'react-router-dom';

import { Button, 
	AppBar,
	Toolbar,
	Typography,
} from '@material-ui/core';

class MainContent extends Component {

	componentDidMount() {
		// const {users}	= this.props;
		// if (users.length === 0)
			this.props.fetchUsersApi();
	}

	render() {
		return (
			<div className="App">
			  <AppBar position="fixed">
		        <Toolbar>
		          <Typography variant="h6" className="rtert">
		            Users
		          </Typography>
		          <Button color="inherit" component={Link} to="/add" className="button-back" variant="outlined" >Add New</Button>
		        </Toolbar>
		      </AppBar>
				<header className="App-header">
					<UserList users={this.props.users}/>
				</header>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	users: state.users
})

export default connect(mapStateToProps, { fetchUsersApi })(MainContent);