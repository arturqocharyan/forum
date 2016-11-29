import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory,IndexRoute  } from 'react-router'
import App from './components/App'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from  './components/Home'
import User from './components/User'
import RegistrEdit from './components/auth/RegistrEdit'
import Facebook from './components/auth/Facebook'

render((
  
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="register" component={Register} />
      <Route path="login" component={Login} />
      <Route path="/registersUsers/:id/:username" component={RegistrEdit} />
      <Route path="/users/:id" component={User} />
      <Route path='/Home' component={User} />
      <Route path='/redirect' component={RegistrEdit} />
      
    </Route>
  </Router>
), document.getElementById('app'))
