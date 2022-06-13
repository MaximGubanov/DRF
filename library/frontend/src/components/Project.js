import React from 'react';
import {Link} from 'react-router-dom';


const ProjectItem = ({item, deleteProject}) => {

    return (
        <tr>
            <td>{item.id}</td>
            <td>
                <Link to={`{project/${item.name}}`}>{item.name}</Link>
            </td>
            <td>{item.url}</td>
            <td>
                {item.repo}
            </td>
            <td><button onClick={() => deleteProject(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {

    return (
        <div>
            <table>
                <th>ID</th>
                <th>
                    name
                </th>
                <th>URL</th>
                <th>
                    repository
                </th>
                <th></th>
                    {projects.map((item) => <ProjectItem item={item} deleteProject={deleteProject} />)}
            </table>
            <Link to="/project/create">Создать проект</Link>
        </div>
    )
}

export default ProjectList;