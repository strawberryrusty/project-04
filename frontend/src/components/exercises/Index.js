import React from 'react'
import axios from 'axios'
import Select from 'react-select'

const options = [
  { value: 5, label: 'Legs' },
  { value: 4, label: 'Core' },
  { value: 3, label: 'Arms' },
  { value: 2, label: 'Shoulders' },
  { value: 1, label: 'Chest' }
]

import { Link } from 'react-router-dom'

class ExercisesIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedCategory: null
    }
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(selectedOption) {
    console.log(selectedOption)
    this.setState({ selectedCategory: selectedOption.value })
  }

  componentDidMount() {
    axios.get('/api/exercises')
      .then(res => this.setState({ exercises: res.data }))

  }

  filterExercises(){
    if(!this.state.selectedCategory) return this.state.exercises
    return this.state.exercises.filter(exercise => exercise.categories.includes(this.state.selectedCategory))
  }




  render() {
    console.log(this.state)
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

            {this.state.exercises && this.filterExercises().map(exercise =>
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
