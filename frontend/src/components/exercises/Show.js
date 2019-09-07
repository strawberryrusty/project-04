import React from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'
// import Auth from '../../lib/Auth'


class ExercisessShow extends React.Component {
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
            <h1 className="title is-2">{this.state.exercise.name}</h1>
            <h2 className="subtitle is-4">{this.state.exercise.description}</h2>
            <h2 className="subtitle is-4">{this.state.exercise.image}</h2>
            <h2 className="subtitle is-4">{this.state.exercise.categories}</h2>
          </div>
        </div>
      </section>
    )
  }
}
export default ExercisessShow
