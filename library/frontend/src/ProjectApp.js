import React from 'react';
import axios from 'axios';
import ProjectsList from './components/Projects';
import {BrowserRouter, Route, Link} from 'react-router-dom';


class Project extends React.Component {

    constructor(props) {
      
        super(props)
        this.state = {
          'projects': []
        }
    }

    componentDidMount () {
        axios.get('http://127.0.0.1:8000/filters/project/')
          .then(response => {
            const projects = response.data
              this.setState(
                {
                  'projects': projects
                }
              )}
          )
          .catch(error => console.log(error))
    }

    render () {
        return (
            <div className="ProjectApp">
                <BrowserRouter>
                    <ul>
                        <li>
                            <Link to='/projects'>Projects</Link>
                        </li>
                    </ul>
                    <Route exact path='/projects' component={() => <ProjectsList projects={this.state.projects}/>} />
                </BrowserRouter>
            </div>
        )
    }
}

export default Project