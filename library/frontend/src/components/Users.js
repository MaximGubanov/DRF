import React from 'react';
import axios from 'axios';


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.id}
            </td>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstname}
            </td>
            <td>
                {user.lastname}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

class UsersList extends React.Component {

    constructor(props) {
      
        super(props)
        this.state = {
          'users': []
        }
    }
  
    componentDidMount () {
      axios.get('http://127.0.0.1:8002/users/')
        .then(response => {
          const users = response.data
            this.setState(
              {
                'users': users
              }
            )}
        )
        .catch(error => console.log(error))
    }

    render () {
        return (
            <table>
                <th>
                    ID
                </th>
                <th>
                    username
                </th>
                <th>
                    firstname
                </th>
                <th>
                    lastname
                </th>
                <th>
                    email
                </th>
                    {this.state.users.map((user) => <UserItem user={user} />)}
            </table>
        )
    }
}

export default UsersList;