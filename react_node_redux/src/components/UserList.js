import React, { Component } from 'react'
import UserItem from './UserItem'

class UserList extends Component {

    render() {
        const { users } = this.props

        console.log(users.length);
        if (users.length === 0) {
            return <span> No Records </span>
        }

        return (
            <div>
                <ul className="user-list list-group">
                    {
                        users.map( (user, index) =>{
                            return <UserItem key={index}
                                        {...user}
                                    />
                        })
                    }
                </ul>
            </div>

        )
    }
}

export default UserList