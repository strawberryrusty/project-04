import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

class ExercisesIndex extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    axios.get('/api/programme/exercises')
      .then(res => this.setState({ exercises: res.data }))
  }

  render() {
    console.log(this.state.excercises)
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">

            {!this.state.exercises && <h2 className="title is-2">Loading...</h2>}

            {this.state.exercises && this.state.exercises.map(exercise =>
              <div className="column is-one-quarter-desktop" key={exercise._id}>
                <Link to={`/exercises/${exercise._id}`}>
                  <div className="card">
                    <div className="card-header">
                      <h2 className="card-header-title">{exercise.name}</h2>
                    </div>
                  </div>
                </Link>
              </div>
            )}

          </div>
        </div>
      </section>
    )
  }
}

export default ExercisesIndex
