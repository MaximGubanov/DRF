import React from 'react';
import {Link} from 'react-router-dom';


const AuthorItem = ({author}) => {
    return (
        <tr>
            <td>
                <Link to={`author/${author.id}`}>{author.id}</Link>
            </td>
            <td>
                {author.name}
            </td>
            <td>
                {author.birthday_year}
            </td>
        </tr>
    )
}

const AuthorsList = ({authors}) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                name
            </th>
            <th>
                birthday_year
            </th>
                {authors.map((author) => < AuthorItem author={author} />)}
        </table>
    )
}

export default AuthorsList