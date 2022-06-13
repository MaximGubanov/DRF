import React from 'react';


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
            <td>{user.url}</td>
        </tr>
    )
}

const UsersList = ({users}) => {
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
            <th>URL</th>
                {users.map((user) => < UserItem user={user} />)}
        </table>
    )
}

export default UsersList;