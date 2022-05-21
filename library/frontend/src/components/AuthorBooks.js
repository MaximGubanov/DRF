import React from 'react';
import {useParams} from 'react-router-dom';


const BookItem = ({item}) => {
    return (
        <tr>
            <td>
                {item.id}
            </td>
            <td>
                {item.name}
            </td>
            <td>
                {item.author.name}
            </td>
        </tr>
    )
}

const AuthorBooksList = ({items}) => {

    let {id} = useParams()
    let filtred_items = items.filter((item) => item.author.id === id)

    return (
        <table>
            <th>
                id
            </th>
            <th>
                name
            </th>
            <th>
                author
            </th>
                {filtred_items.map((item) => < BookItem item={item} />)}
        </table>
    )
}

export default AuthorBooksList