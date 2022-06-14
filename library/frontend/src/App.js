import React from 'react';
import axios from 'axios';
import UsersList from './components/Users';
import ProjectsList from './components/Project';
import TodosList from './components/Todo';
import LoginForm from './components/Auth';
import ProjectForm from './components/ProjectForm';
import TodoForm from './components/TodoForm';
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

    const getUsersData = () => axios.get('http://127.0.0.1:8002/api/users/', {headers}).catch(err => null);
    const getProjectsData = () => axios.get('http://127.0.0.1:8002/filters/project/', {headers}).catch(err => null);
    const getTodoData = () => axios.get('http://127.0.0.1:8002/todo/', {headers}).catch(err => null);

    try {
        const [UserData, ProjectsData, TodoData] = await axios.all([ getUsersData(), getProjectsData(), getTodoData() ]);
        this.setState({
            'users': UserData.data.results,
            'projects': ProjectsData.data.results,
            'todo': TodoData.data.results
          }
        );
        console.log(this.state.users)
    }
    catch (err) {
        console.log(err.message);
    }
  }

  get_token(username, password) {
      axios.post('http://127.0.0.1:8002/api-token-auth/', {username: username, password: password})
      .then(response => {
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

  createProject(name, repo, created_at, created_by, updated_at) {
      const headers = this.get_headers()
      const data = {name: name, repo: repo, created_at: created_at, created_by: created_by, updated_at: updated_at}
      console.log("Данные перед отправкой" + data)
      axios.post(`http://127.0.0.1:8002/filters/project/`, data, {headers})
          .then(response => {
              let new_project = response.data
              console.log("pprpprpr" + new_project)
              const project = this.state.projects.filter((item) => item.id === new_project)[0]
              new_project = project
              this.setState({projects: [...this.state.projects, new_project]})
              console.log(this.state.projects)
          }).catch(error => console.log(error))
  }

  deleteProject(id) {
      const headers = this.get_headers()
      axios.delete(`http://127.0.0.1:8002/filters/project/${id}/`, {headers})
          .then(response => {
              this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
          }).catch(error => console.log(error))
  }

  createTodo(text, project, created_by) {
    const headers = this.get_headers()
    const data = {text: text, project: project, created_by: created_by}
    console.log("Данные перед отправкой" + data)
    axios.post(`http://127.0.0.1:8002/todo/`, data, {headers})
        .then(response => {
            let new_todo = response.data
            const todo = this.state.todo.filter((item) => item.id === new_todo)[0]
            new_todo = todo
            this.setState({todo: [...this.state.todo, new_todo]})
            console.log(this.state.todo)
        }).catch(error => console.log(error))
  }

  deleteTodo(id) {
      const headers = this.get_headers()
      axios.delete(`http://127.0.0.1:8002/todo/${id}/`, {headers})
          .then(response => {
              this.setState({todo: this.state.projects.filter((item) => item.id !== id)})
          }).catch(error => console.log(error))
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
              <Route exact path='/projects' component={() => <ProjectsList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
              <Route exact path='/project/create' component={() => <ProjectForm users={this.state.users} createProject={
                  (name, repo, created_at, created_by, updated_at) => this.createProject(name, repo, created_at, created_by, updated_at)} />} />
              <Route exact path='/todo' component={() => <TodosList todos={this.state.todo} deleteTodo={(id) => this.deleteTodo(id)} />} />
              <Route exact path='/todo/create' component={() => <TodoForm users={this.state.users} projects={this.state.projects}
                  createTodo={(text, project, created_by) => this.createTodo(text, project, created_by)} />} />
              <Route exact path='/login' component={() => <LoginForm  get_token={(username, password) => {this.get_token(username, password)}} />} />
              <Route component={NotFound404} />
            </Switch>
          </BrowserRouter>
        </div>
      )
  }
}

export default App;