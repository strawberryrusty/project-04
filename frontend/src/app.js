import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Home from './components/pages/Home'
import About from './components/pages/About'
import ProgrammesIndex from './components/programmes/Index'
import ProgrammesShow from './components/programmes/Show'
import ExercisesIndex from './components/exercises/Index'
import ExercisesShow from './components/exercises/Show'



import Register from './components/auth/Register'
import Login from './components/auth/Login'

class App extends React.Component {

  render() {
    return (
      <div>
        <HashRouter>

          <Switch>
            <Route path="/exercises/:id" component={ExercisesShow}/>
            <Route path="/exercises" component={ExercisesIndex} />
            <Route path="/programmes/:id" component={ProgrammesShow}/>
            <Route path="/programmes" component={ProgrammesIndex} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Route exact path="/" component={Home} />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}





ReactDOM.render(
  <App />,
  document.getElementById('root')
)
