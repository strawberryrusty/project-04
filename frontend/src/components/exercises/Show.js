import React from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'
// import Auth from '../../lib/Auth'


class ExercisesShow extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount(){
    axios.get(`/api/exercises/${this.props.match.params.id}/`)
      .then(res => this.setState({exercise: res.data}))
  }


  render(){
    if(!this.state.exercise) return null
    return (
      <section className="section">
        <div className="container">
          <div className="column is-half-tablet">
            <div key={this.state.exercise.id}>
              <h1 className="title is-2">Name:{this.state.exercise.name}</h1>
              <h2 className="subtitle is-4">Description:{this.state.exercise.description}</h2>
              <img className="ShowImage" src={this.state.exercise.image} alt={this.state.exercise.name}/>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ExercisesShow
