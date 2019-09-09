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



class ItemsNew extends React.Component {
  constructor(){
    super()

    this.state = {
      formData: {
        day: '',
        exercise: '',
        sets: '',
        reps: '',
        personalbest: ''
      },
      dropdownOpen: false,
      errors: {}

    }

    this.handleChange = this.handleChange.bind(this)
    this.handleDayChange = this.handleDayChange.bind(this)
    this.handleExerciseChange = this.handleExerciseChange.bind(this)

  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post(`/api/programmes/${this.props.match.params.id}/items`, this.state.formData, {
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
    const formData = { ...this.state.formData, day: selectedDay.map(option => option.value) }
    this.setState({ formData })
  }

  handleExerciseChange(e) {
    const formData = {...this.state.formData, plotType: e.target.value }
    this.setState({ formData, dropdownOpen: false })

  }

  render() {
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
                name="days"
                options={days}
                isMulti
                onChange={this.handleDayChange}
              />
            </div>
            <label className="label">Choose your Exercise:</label>
            <div className={`dropdown ${this.state.dropdownOpen ? 'is-active' : ''}`} onClick={this.toggleDropdown}>
              <div className="dropdown-trigger">
                <button type="button" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>Exercise</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <button type="button" className="dropdown-item" onClick={this.handleExerciseChange} value='Bench Press'>Bench Press</button>
                  <button type="button" className="dropdown-item" onClick={this.handleExerciseChange} value='Squats'>Squats</button>
                  <button type="button" className="dropdown-item" onClick={this.handleExerciseChange} value='Shoulder Press'>Shoulder Press</button>
                  <button type="button" className="dropdown-item" onClick={this.handleExerciseChange} value='Deadlift'>Deadlift</button>
                  <button type="button" className="dropdown-item" onClick={this.handleExerciseChange} value='Push Ups'>Push Ups</button>
                  <button type="button" className="dropdown-item" onClick={this.handleExerciseChange} value='Crunches'>Crunches</button>
                </div>
              </div>
              <div className="container">
                <div className="field">
                  <label className="label">Sets</label>
                  <input
                    className="input"
                    type="number"
                    name="numOfSets"
                    onChange={this.handleChange}
                    value={this.state.formData.sets || ''}
                    placeholder="please add sets for the exercise"
                  />
                </div>
              </div>
              <div className="container">
                <div className="field">
                  <label className="label">Reps</label>
                  <input
                    className="input"
                    type="number"
                    name="numOfReps"
                    onChange={this.handleChange}
                    value={this.state.formData.reps || ''}
                    placeholder="please add reps per set"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Personal best (kgs)</label>
                <input
                  className="input"
                  type="number"
                  name="numOfSets"
                  onChange={this.handleChange}
                  value={this.state.formData.personalbest || ''}
                  placeholder="please your PB on this exercise"
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
export default ItemsNew
