import React from 'react';
import {Link} from 'react-router-dom';


const ProjectItem = ({item}) => {

    return (
        <tr>
            <td>
                <Link to={`{project/${item.name}}`}>{item.name}</Link>
            </td>
            <td>
                {item.repo}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {

    return (
        <table>
            <th>
                name
            </th>
            <th>
                repo
            </th>
                {projects.map((item) => <ProjectItem item={item} />)}
        </table>
    )
}

export default ProjectList;