import React from 'react';
import{ Link} from 'react-router-dom';


// по сути компонент IsActive - это "костыль", т.к. почему-то не хочет item.is_active прописывать будевое знчение в <td></td>
const IsActive = ({bool}) => {
    if (bool) {
        return (<td>True</td>)
    } else {
        return (<td>False</td>)
    }
}

const TodoItem = ({item}) => {
    return (
        <tr>
            <td>
                {item.created_by}
            </td>
            <td>
                {item.text}
            </td>
            <td>
                <Link to={`${item.project}`}>{item.project}</Link>
            </td>
                <IsActive bool={item.is_active} /> 
        </tr>
    )
}

const TodosList = ({todos}) => {
    return (
        <table>
            <th>
                Created_By
            </th>
            <th>
                Description
            </th>
            <th>
                Project
            </th>
            <th>
                Is_active
            </th>
                {todos.map((item) => <TodoItem item={item} />)}
        </table>
    )
}

export default TodosList;