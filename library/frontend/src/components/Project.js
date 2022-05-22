import React from 'react';
import axios from 'axios';


const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>
                {item.name}
            </td>
            <td>
                {item.repo}
            </td>
        </tr>
    )
}

class ProjectsList extends React.Component {

    constructor(props) {
      
        super(props)
        this.state = {
          'projects': []
        }
    }
  
    componentDidMount () {
      axios.get('http://127.0.0.1:8002/filters/project/')
        .then(response => {
          const projects = response.data
            this.setState(
              {
                'projects': projects.results
              }
            )}
        )
        .catch(error => console.log(error))
    }

    render () {
        return (
            <table>
                <th>
                    name
                </th>
                <th>
                    repo
                </th>
                    {this.state.projects.map((item) => <ProjectItem item={item} />)}
            </table>
        )
    }
}

export default ProjectsList;