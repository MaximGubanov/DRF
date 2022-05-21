import React from 'react';


const BookItem = ({book}) => {
    return (
        <tr>
            <td>
                {book.id}
            </td>
            <td>
                {book.name}
            </td>
            <td>
                {book.author.name}
            </td>
        </tr>
    )
}

const BooksList = ({books}) => {
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
                {books.map((book) => < BookItem book={book} />)}
        </table>
    )
}

export default BooksList