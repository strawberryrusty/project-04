import React from 'react'
import axios from 'axios'
import Select from 'react-select'

const options = [
  { value: 'Legs', label: 'Legs' },
  { value: 'Core', label: 'Core' },
  { value: 'Arms', label: 'Arms' },
  { value: 'Shoulders', label: 'Shoulders' },
  { value: 'Chest', label: 'Chest' }
]


import { Link } from 'react-router-dom'

class ExercisesIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedOption: null
    }
  }


  handleChange(selectedOption) {
    this.setState({ selectedOption })
    console.log('Option selected:', selectedOption)
  }

  componentDidMount() {
    axios.get('/api/exercises')
      .then(res => this.setState({ exercises: res.data }))
  }

  render() {
    // console.log(this.state.excercises)
    const { selectedOption } = this.state
    return (

      <section className="section">
        <div className="container">
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
          />
          <div className="columns is-multiline">

            {!this.state.exercises && <h2 className="title is-2">Loading...</h2>}

            {this.state.exercises && this.state.exercises.map(exercise =>
              <div className="column is-one-quarter-desktop" key={exercise.id}>
                <Link to={`/exercises/${exercise.id}`}>
                  <div className="card">
                    <div className="card-header">
                      <h2 className="card-header-title">{exercise.name}</h2>
                      <div className="card-content">
                        <img className="Image" src={exercise.image} alt={exercise.name}/>
                      </div>
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
