import React from 'react'
import axios from 'axios'


// import {Link} from 'react-router-dom'
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
              <h1 className="title is-2">Item:{this.state.programme.items.item}</h1>
              {this.state.programme.items.map(keys =>
                <div key={keys.id}>
                  <h1 className="title is-2">Day:{keys.day}</h1>
                  <h1 className="title is-2">Exercise:{keys.exercise.name}</h1>
                  <h1 className="title is-2">Description:{keys.exercise.description}</h1>
                  <img className="ShowImage" src={keys.exercise.image} alt={keys.exercise.name}/>
                  <h1 className="title is-2">Category:{keys.exercise.categories}</h1>
                  <h1 className="title is-2">Personal Best:{keys.personalbest}</h1>
                  <h1 className="title is-2">Sets:{keys.sets}</h1>
                  <h1 className="title is-2">Reps:{keys.reps}</h1>
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
