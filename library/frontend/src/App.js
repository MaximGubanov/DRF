import React from 'react';
import axios from 'axios';
import UsersList from './components/Users';
import BooksList from './components/Book';
import AuthorsList from './components/Authors';
import AuthorBookList from './components/AuthorBooks';
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

      const author1 = {id: 1, name: 'Грин', birthday_year: 1880}
      const author2 = {id: 2, name: 'Пушкин', birthday_year: 1799}
      const authors = [author1, author2]

      const book1 = {id: 1, name: 'Алые паруса', author: author1}
      const book2 = {id: 2, name: 'Золотая цепь', author: author1}
      const book3 = {id: 3, name: 'Пиковая дама', author: author2}
      const book4 = {id: 4, name: 'Руслан и Людмила', author: author2}
      const books = [book1, book2, book3, book4]

      this.state = {
        'users': [],
        'books': books,
        'authors': authors
      }
  }

  componentDidMount () {
    axios.get('http://127.0.0.1:8000/users/')
      .then(response => {
        const users = response.data
          this.setState(
            {
              'users': users
            }
          )}
      )
      .catch(error => console.log(error))
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
                  <Link to='/books'>Books</Link>
                </li>
                <li>
                  <Link to='/authors'>Authors</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route exact path='/users' component={() => <UsersList users={this.state.users}/>} />
              <Route exact path='/books' component={() => <BooksList books={this.state.books}/>} />
              <Route exact path='/authors' component={() => <AuthorsList authors={this.state.authors}/>} />
              <Route exact path="/author/:id" component={() => <AuthorBookList items={this.state.books}/>} />
              <Route component={NotFound404} />
            </Switch>
          </BrowserRouter>
        </div>
      )
  }
}

export default App