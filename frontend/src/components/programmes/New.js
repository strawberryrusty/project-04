import React, {Component} from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class ProgrammesNew extends Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/programmes/', this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then((res) => this.props.history.push(`/programmes/${res.data.id}`))
      .catch(err => this.setState({ errors: err.response.data }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }




  render() {
    return (
      <section className="section add-background">
        <div className="container">
          <div className="box tableBorder">
            <h2 className="title is-3 has-white-text">Creat your own special programme</h2>
            <p>Creat your own special gymapp programme that suits you and your lifestyle and share it with the Gymapp community. Be a part of the Gymapp movement!</p>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <input
                className="input"
                name="name"
                placeholder="eg: 30 day programme"
                value={this.state.formData.name || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
            </div>
            <div className="field">
              <label className="label">Image</label>
              <input
                className="input"
                name="image"
                type="string"
                placeholder="Enter URL here"
                value={this.state.formData.image || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.image && <small className="help is-danger">{this.state.errors.image}</small>}
            </div>
            <div>
              <button className="button">Create Programme</button>
            </div>
          </form>

        </div>
      </section>
    )
  }
}

export default ProgrammesNew
