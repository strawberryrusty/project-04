import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

import Select from 'react-select'

const days = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' }
]


class ItemsEdit extends React.Component {
  constructor(){
    super()

    this.state = {
      formData: {},
      dropdownOpen: false,
      errors: {}

    }

    this.handleChange = this.handleChange.bind(this)
    this.handleDayChange = this.handleDayChange.bind(this)
    this.handleExerciseChange = this.handleExerciseChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {
    axios.get(`/api/items/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))
      .then(axios.get('/api/exercises')
        .then(res => this.setState({ exercises: res.data.map(exercise => {
          return {label: exercise.name, value: exercise.id} // map over res.data to get the exercises
        }) })))

  }

  handleSubmit(e) {
    e.preventDefault()

    axios.put(`/api/programmes/${this.props.match.params.id}/items/${this.props.match.params.id}`, this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`programmes/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleDayChange(selectedDay) {
    const formData = { ...this.state.formData, day: selectedDay.value }
    this.setState({ formData })
  }

  handleExerciseChange(selectedExercise) {
    console.log(selectedExercise)
    const formData = {...this.state.formData, exercise: selectedExercise.value }
    this.setState({ formData, dropdownOpen: false })

  }



  render() {
    if (!this.state.formData) return <h1>Loading...</h1>
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="box tableBorder">
              <h2 className="title is-3 has-white-text">What do you want to exercise?</h2>
              <p>Please add an exercise to your day, and your specified reps, sets and personal best</p>
            </div>
            <div className="field">
              <label className="label">Day</label>
              <Select
                options={days}
                onChange={this.handleDayChange}
              />
            </div>
            <label className="label">Choose your Exercise:</label>
            <div className="field">
              <label className="label">Exercise</label>
              <Select
                options={this.state.exercises} //get all the exercises
                onChange={this.handleExerciseChange}
              />
            </div>

            <div className="container">
              <div className="field">
                <label className="label">Sets</label>
                <input
                  className="input"
                  name="sets"
                  placeholder="eg:25"
                  onChange={this.handleChange}
                  value={this.state.formData.sets || ''}
                />
              </div>
            </div>
            <div className="container">
              <div className="field">
                <label className="label">Reps</label>
                <input
                  className="input"
                  name="reps"
                  placeholder="eg: 52.2"
                  onChange={this.handleChange}
                  value={this.state.formData.reps || ''}
                />
              </div>
            </div>
  
            <button className="button">Submit</button>
          </form>
        </div>
      </section>
    )
  }
}
export default ItemsEdit
