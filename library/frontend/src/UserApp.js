import React from 'react';
import UserList from './components/Users.js';
import './components/style.css'
import axios from 'axios';


class UserApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                < UserList users={this.state.users} />
            </div>
        )
    }
}

export default UserApp;