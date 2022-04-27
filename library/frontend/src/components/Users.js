import React from 'react'
import './style.css'


const UserItem = ({user}) => {
    return (
        <tr>
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

const UserList = ({users}) => {
    return (
        //     <table>
        //         <thead>
        //             <tr>
        //                 <td>
        //                     UserName
        //                 </td>
        //                 <td>
        //                     First Name
        //                 </td>
        //                 <td>
        //                     Last Name
        //                 </td>
        //                 <td>
        //                     Email
        //                 </td>
        //             </tr>
        //         </thead>
        //     <tbody>
        //         {users.map((user) => < UserItem user={user} />)}
        //     </tbody>
        // </table>

        <div class="header-2">
        <div class="container">
            <div class="header-2__bar header-block header-2__bar_padding">
                <div class="header-2__block header__block flex-row">
                     <table>
                        <thead>
                            <tr>
                                <td>
                                    UserName
                                </td>
                                <td>
                                    First Name
                                </td>
                                <td>
                                    Last Name
                                </td>
                                <td>
                                    Email
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => < UserItem user={user} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}

export default UserList