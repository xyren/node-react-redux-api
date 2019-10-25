import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {Button} from '@material-ui/core';
import axios from 'axios';

const { API_URL, API_KEY } = require('../config/index');

class UserItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleDelete = () => {
        axios.put(API_URL + '/person/delete/', {userId: this.props.id},
        { 
            headers: {
                "Accept": "application/json",
                "x-api-key": API_KEY
            }
        }).then(res => {
            // redirect if success
            window.location = '/';
        });

        this.handleClose();
    };

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    render() {

        const { open } = this.state;
        const { id, firstname, lastname, contact_no } = this.props;

        return (
            <li className="list-group-item"  key={id}>
                ID: <b>{id} </b><br/>
                Firstname: <b>{firstname} </b><br/>
                Lastname: <b>{lastname} </b><br/>
                Contact No: <b>{contact_no} </b>

                <span className="pull-right">
                    <Link to={`edit/${id}`}> 
                        <button className="btn btn-xs btn-info" title="Edit Record">
                            <i className="fa fa-edit"></i>
                        </button>
                    </Link>
                    <button className="btn btn-xs btn-danger" title="Delete Record" onClick={this.handleClickOpen}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </span>

                <div>
                    <Dialog key={id}
                        open={open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{"Delete record"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you wat to delete this record <b>(ID: {id})?</b>
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleClose} variant="outlined" color="default">
                                Cancel
                            </Button>

                            <Button onClick={this.handleDelete} variant="contained" color="secondary">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </li>
        )
    }
}

export default UserItem