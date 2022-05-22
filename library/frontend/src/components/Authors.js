import React from 'react';
import {Link} from 'react-router-dom';


export default function AuthorsList () {

    const author1 = {id: 1, name: 'Грин', birthday_year: 1880}
    const author2 = {id: 2, name: 'Пушкин', birthday_year: 1799}
    const authors = [author1, author2]
    
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