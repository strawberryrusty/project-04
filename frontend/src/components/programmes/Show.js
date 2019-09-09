import React from 'react'
import axios from 'axios'


import {Link} from 'react-router-dom'
// import Auth from '../../lib/Auth'


class ProgrammesShow extends React.Component {
  constructor(){
    super()

    this.state = {
    }
  }

  componentDidMount(){
    axios.get(`/api/programmes/${this.props.match.params.id}/`)
      .then(res => this.setState({ programme: res.data }))
  }

  render(){
    console.log(this.state.programme)
    if(!this.state.programme) return null
    return (
      <section className="section">
        <div className="container">
          <div className="column is-half-tablet">
            <div key={this.state.programme.id}>
              <h1 className="title is-2">Name:{this.state.programme.name}</h1>
              {this.state.programme.items.map(keys =>
                <div key={keys.id}>
                  <h2 className="title is-1">Day:{keys.day}</h2>
                  <h2 className="title is-1">Exercise:{keys.exercise.name}</h2>
                  <h2 className="title is-1">Description:{keys.exercise.description}</h2>
                  <img className="ShowImage" src={keys.exercise.image} alt={keys.exercise.name}/>
                  <h2 className="title is-1">Personal Best:{keys.personalbest}</h2>
                  <h2 className="title is-1">Sets:{keys.sets}</h2>
                  <h2 className="title is-1">Reps:{keys.reps}</h2>
                  <div><Link to="/programmes/items/new"><button className="button">Add Item</button></Link></div>
                  <hr/>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default ProgrammesShow
