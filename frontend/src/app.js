import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Home from './components/pages/Home'
import Navbar from './components/common/Navbar'
import About from './components/pages/About'
import ProgrammesNew from './components/programmes/New'
import ProgrammesIndex from './components/programmes/Index'
import ProgrammesShow from './components/programmes/Show'
import ProgrammesEdit from './components/programmes/Edit'
import ExercisesIndex from './components/exercises/Index'
import ExercisesShow from './components/exercises/Show'
import ItemsNew from './components/items/New'
import ItemsEdit from './components/items/Edit'


import SecureRoute from './components/common/SecureRoute'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Footer from './components/pages/Footer'

import '@fortawesome/fontawesome-free/js/all.js'

import 'bulma'
import './style.scss'


class App extends React.Component {

  render() {
    return (
      <div>
        <HashRouter>
          <Navbar />

          <Switch>
            <Route path="/programmes/:id/items/:id/edit" component={ItemsEdit} />
            <Route path="/programmes/:id/items/new" component={ItemsNew} />
            <Route path="/exercises/:id" component={ExercisesShow}/>
            <Route path="/exercises" component={ExercisesIndex} />
            <SecureRoute path="/programmes/:id/edit" component={ProgrammesEdit} />
            <SecureRoute path="/programmes/new" component={ProgrammesNew} />
            <Route path="/programmes/:id" component={ProgrammesShow}/>
            <SecureRoute path="/programmes" component={ProgrammesIndex} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Route exact path="/" component={Home} />
          </Switch>
        </HashRouter>
        <Footer />
      </div>
    )
  }
}





ReactDOM.render(
  <App />,
  document.getElementById('root')
)
