import React from 'react';
import axios from 'axios';
import UsersList from './components/Users';
import ProjectsList from './components/Project';
import TodosList from './components/Todo';
// import ProjectInfo from './components/ProjectInfo';
import {Route, Link, Switch, BrowserRouter} from 'react-router-dom';


const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}

class App extends React.Component {

  constructor(props) {
    
      super(props)
      this.state = {
        'users': [],
        'projects': [],
        'todo': []
      }
  }

  getUsersData = () => axios.get('http://127.0.0.1:8002/users/').catch(err => null);
  getProjectsData = () => axios.get('http://127.0.0.1:8002/filters/project/').catch(err => null);
  getTodoData = () => axios.get('http://127.0.0.1:8002/todo/').catch(err => null);

  async componentDidMount() {
    try {
        const [UserData, ProjectsData, TodoData] = await axios.all([ this.getUsersData(), this.getProjectsData(), this.getTodoData() ]);
        this.setState({
            'users': UserData.data,
            'projects': ProjectsData.data.results,
            'todo': TodoData.data.results
          }
        );
    }
    catch (err) {
        console.log(err.message);
    }
}


  render () {
      return (
        <div className="App">
          <BrowserRouter>
            <nav>
              <ul>
                <li>
                  <Link to='/users'>Users</Link>
                </li>
                <li>
                  <Link to='/projects'>Projects</Link>
                </li>
                <li>
                  <Link to='/todo'>TODO</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route exact path='/users' component={() => <UsersList users={this.state.users} />} />
              <Route exact path='/projects' component={() => <ProjectsList projects={this.state.projects} />} />
              <Route exact path='/todo' component={() => <TodosList todos={this.state.todo} />} />
              <Route component={NotFound404} />
            </Switch>
          </BrowserRouter>
        </div>
      )
  }
}

export default App