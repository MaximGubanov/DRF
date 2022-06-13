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

const TodoItem = ({item, deleteTodo}) => {
    return (
        <tr>
            <td>{item.id}</td>
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
            <td><button onClick={() => deleteTodo(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const TodosList = ({todos, deleteTodo}) => {
    return (
        <div>
            <table>
                <th>ID</th>
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
                <th></th>
                    {todos.map((item) => <TodoItem item={item} deleteTodo={deleteTodo}/>)}
            </table>
            <Link to="/todo/create">Создать заметку</Link>
        </div>
    )
}

export default TodosList;