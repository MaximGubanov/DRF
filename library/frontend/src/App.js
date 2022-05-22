import React from 'react';
import UsersList from './components/Users';
// import BooksList from './components/Book';
import AuthorsList from './components/Authors';
// import AuthorBookList from './components/AuthorBooks';
import ProjectsList from './components/Project';
import TodosList from './components/Todo';
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
      this.state = {}
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
                  <Link to='/authors'>Authors</Link>
                </li>
                <li>
                  <Link to='/todo'>TODO</Link>
                </li>
                {/* <li>
                  <Link to='/books'>TODO</Link>
                </li> */}
              </ul>
            </nav>
            <Switch>
              <Route exact path='/users' component={() => <UsersList />} />
              <Route exact path='/projects' component={() => <ProjectsList />} />
              <Route exact path='/authors' component={() => <AuthorsList />} />
              <Route exact path='/todo' component={() => <TodosList />} />
              {/* <Route exact path='/books' component={() => <BooksList />} /> */}
              <Route component={NotFound404} />
            </Switch>
          </BrowserRouter>
        </div>
      )
  }
}

export default App