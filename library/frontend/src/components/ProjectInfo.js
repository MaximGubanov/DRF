import React from 'react';
import { useParams } from 'react-router-dom';


const ProItem = ({item}) => {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.text}</td>
            <td>{item.created_at}</td>
        </tr>
    )
}

const ProjectInfo = ({items}) => {

    let { proj } = useParams();
    let filtered_items = items.filter((item) => item.project === proj)

    return (
        <table>
            <th>
                name
            </th>
            <th>
                repo
            </th>
                {filtered_items.map((item) => <ProItem item={item} />)}
        </table>
    )
}

export default ProjectInfo;