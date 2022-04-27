import React from 'react';
import AuthorList from './components/Author.js';
import UserList from './components/Users.js';
import MenuList from './components/menu.js';
import Footer from './components/footer.js';
import axios from 'axios';


// class App extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//         'authors': []
//         }
//     }

//     componentDidMount() {
//         axios.get('http://127.0.0.1:8000/api/authors')
//             .then(response => {
//                 const authors = response.data
//                     this.setState(
//                     {
//                         'authors': authors
//                     }
//                 )
//             }).catch(error => console.log(error))
//     }

//     render() {
//         return (
//             <div>
//                 < AuthorList authors={this.state.authors} />
//             </div>
//         )
//     }
// }

// export default App;


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div class='wrapper'>
                <header>
                    < MenuList />
                </header>

                <div class="main">
                    < UserList users={this.state.users} />
                </div>

                <footer class="footer">
                    < Footer />
                </footer>

            </div>

        )
    }
}

export default App;