import React from 'react'


const AuthorItem = ({author}) => {
    return (
        <tr>
            <td>
                {author.first_name}
            </td>
            <td>
                {author.last_name}
            </td>
            <td>
                {author.birthday_year}
            </td>
        </tr>
    )
}

const AuthorList = ({authors}) => {
    return (
        <table>
            <thead>
                <tr>
                    <td>
                        First name
                    </td>
                    <td>
                        Last Name
                    </td>
                    <td>
                        Birthday year
                    </td>
                </tr>
            </thead>
            <tbody>
                {authors.map((author) => < AuthorItem author={author} />)}
            </tbody>
        </table>
    )
}

export default AuthorList