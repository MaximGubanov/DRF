import React from 'react';
import axios from 'axios';
import UsersList from './components/Users';
import ProjectsList from './components/Project';
import TodosList from './components/Todo';
import LoginForm from './components/Auth';
// import ProjectInfo from './components/ProjectInfo';
import {Route, Link, Switch, BrowserRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';


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
        'todo': [],
        'token': ''
      }
  }

  async loadData() {

    const headers = this.get_headers()

    const getUsersData = () => axios.get('http://127.0.0.1:8002/users/', {headers}).catch(err => null);
    const getProjectsData = () => axios.get('http://127.0.0.1:8002/filters/project/', {headers}).catch(err => null);
    const getTodoData = () => axios.get('http://127.0.0.1:8002/todo/', {headers}).catch(err => null);

    try {
        const [UserData, ProjectsData, TodoData] = await axios.all([ getUsersData(), getProjectsData(), getTodoData() ]);
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

  get_token(username, password) {
      axios.post('http://127.0.0.1:8002/api-token-auth/', {username: username, password: password})
      .then(response => {
          // console.log(response.data)
          this.set_token(response.data['token'])
      })
      .catch(error => alert('Неверный логин или пароль'))
  }

  set_token(token) {
      const cookies = new Cookies()
      cookies.set('token', token)
      this.setState({'token': token})
  }

  is_authenticated() {
      return this.state.token !== ''
  }

  logout() {
      this.set_token('')
  }

  get_token_from_storage() {
      const cookies = new Cookies()
      const token = cookies.get('token')
      this.setState({'token': token}, () => {this.loadData()})
  }

  get_headers() {
      let headers = {
          'Content-Type': 'application/json'
        }
      if (this.is_authenticated())
      {
          headers['Authorization'] = 'Token ' + this.state.token
      }
      return headers
  }

  componentDidMount() {
    this.get_token_from_storage()
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
                <li>
                  {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                </li>
              </ul>
            </nav>
            <Switch>
              <Route exact path='/users' component={() => <UsersList users={this.state.users} />} />
              <Route exact path='/projects' component={() => <ProjectsList projects={this.state.projects} />} />
              <Route exact path='/todo' component={() => <TodosList todos={this.state.todo} />} />
              <Route exact path='/login' component={() => <LoginForm  get_token={(username, password) => {this.get_token(username, password)}} />} />
              <Route component={NotFound404} />
            </Switch>
          </BrowserRouter>
        </div>
      )
  }
}

export default App;