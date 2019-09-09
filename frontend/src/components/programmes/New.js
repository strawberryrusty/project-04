import React, {Component} from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'

class ProgrammesNew extends Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleArrayChange = this.handleArrayChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.get('/api/programmes/new')
      .then(res => this.setState({ programmes: res.data }))

    // axios.post('/api/programmes', this.state.formData, {
    //   headers: { Authorization: `Bearer ${Auth.getToken()}`}
    // })
    //   .then(() => this.props.history.push('/programmes/'))
    //   .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleArrayChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value.split(',') }
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
            <div><Link to="/programmes/items/new"><button className="button">Add Item</button></Link></div>
            <div>
              <button className="button">Submit</button>
            </div>
          </form>

        </div>
      </section>
    )
  }
}

export default ProgrammesNew
