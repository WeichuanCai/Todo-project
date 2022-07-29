import React, {Component} from 'react'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import withNavigation from './WithNavigation.jsx'   
import withParams from './WithParams.jsx'

import AuthenticationService from './AuthenticationService.js'

class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const LogoutComponentWithNavigation = withNavigation(LogoutComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const ListTodosComponentWithParams = withParams(ListTodosComponent);
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/logout" element={<LogoutComponentWithNavigation />} />
                        <Route path="/todos" element={<ListTodosComponentWithParams />} />
                        <Route path="/welcome/:name" element={<WelcomeComponentWithParams />} />
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}

class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="*" className="navbar-brand">Weichuan's Project</a></div>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/welcome/:name">Home</Link></li>
                        <li><Link className="nav-link" to="/todos">Todos</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li><Link className="nav-link" to="/login">Login</Link></li>
                        <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout()}>Logout</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}
class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">Copyright by Weichuan</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component {
    render() {
        return (
            <div> 
                <h1>You are logged out</h1>
            </div>
        )
    }
}

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: 'Weichuan',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    loginClicked() {
        if(this.state.username==='Weichuan' && this.state.password==='dummy'){           
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.props.navigate(`/welcome/${this.state.username}`)
        }
        else {
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        }
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    <div className="TodoApp">
                        User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                        Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        <button onClick={this.loginClicked}>Login</button>
                    </div>
                </div>
                
            </div>
        )
    }
}

function ErrorComponent() {
    return <div>An Error Occurred. I don't know what to do! Contact support at abcd-efgh-ijkl</div>
}

class ListTodosComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos : [
                    {id : 1, description : 'learning React', done: false, targetDate: new Date()},
                    {id : 2, description : 'learning angular', done: false, targetDate: new Date()},
                    {id : 3, description : 'learning spring', done: false, targetDate: new Date()}
                    ]
        }
    }
    render() {
        return (
            <div>
                <h1>List Todo</h1>
                <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th> 
                            <th>Completed</th>
                            <th>Target Date</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map( 
                                todo => 
                                <tr>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                </tr>
                            )
                        
                        }
                        
                    </tbody>
                </table>
                </div>
            </div>
        )        
    }
}

class WelcomeComponent extends Component {
    render() {
        return (
            <>
                <h1>Welcome</h1>
                <div className="container">
                    <div>Welcome {this.props.params.name}, you can manage you todos <Link to="/todos">here</Link></div>
                </div>
            
            </>
            
        )        
    }
}

export default TodoApp