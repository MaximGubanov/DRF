import React from 'react';
import axios from 'axios';


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
                {item.project}
            </td>
                <IsActive bool={item.is_active} /> 
        </tr>
    )
}

class TodosList extends React.Component {

    constructor(props) {
      
        super(props)
        this.state = {
          'todos': []
        }
    }
  
    componentDidMount () {
      axios.get('http://127.0.0.1:8002/todo/')
        .then(response => {
          const todos = response.data
            this.setState(
              {
                'todos': todos.results
              }
            )}
        )
        .catch(error => console.log(error))
    }

    render () {
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
                    {this.state.todos.map((item) => <TodoItem item={item} />)}
            </table>
        )
    }
}

export default TodosList;