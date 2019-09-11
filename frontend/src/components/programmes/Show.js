import React from 'react'
import axios from 'axios'


import {Link} from 'react-router-dom'
import Auth from '../../lib/Auth'

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]


class ProgrammesShow extends React.Component {
  constructor(){
    super()

    this.state = {
      formData: {
        weight: ''
      }
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteItems = this.handleDeleteItems.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNewPBSubmit = this.handleNewPBSubmit.bind(this)

  }

  getProgamme(){
    axios.get(`/api/programmes/${this.props.match.params.id}/`)
      .then(res => {
        res.data.items.sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day))
        this.setState({ programme: res.data })
      })

  }

  componentDidMount(){
    this.getProgamme()

  }


  canModify(){
    return Auth.isAuthenticated() && Auth.getPayload().sub === this.state.programme.user.id
  }


  handleDelete(){
    axios.delete(`/api/programmes/${this.props.match.params.id}/`,{
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(()=> this.props.history.push('/programmes'))
  }

  handleDeleteItems(e){
    axios.delete(`/api/items/${e.target.id}/`,{
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(()=> this.getProgamme())

  }

  handleNewPBSubmit(e){
    console.log(e.target.id)
    e.preventDefault()
    axios.post(`/api/items/${e.target.id}/personalbests`, this.state.formData,{
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(()=> {
        const formData = {...this.state.formData, weight: ''}
        this.setState({ formData })
        this.getProgamme()
      })

  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  render(){
    console.log(this.state)
    if(!this.state.programme) return null
    // const weight = this.state.programme.items[0].personalbests.pop().weight
    // console.log(weight)
    return (
      <section className="section">
        <div className="container">

          {!this.state.programme && <h2 className="title is-2">Loading...</h2>}


          <div className="column is-half-tablet">

            <div key={this.state.programme.id}>

              <h1 className="title is-2">Name:{this.state.programme.name}</h1>
              {this.canModify() && <div className="buttons">
                <Link
                  className="button"
                  to={`/programmes/${this.state.programme.id}/edit`}
                >Edit Programme</Link>

                <button className="button is-danger"
                  onClick={this.handleDelete}>Delete Programme</button>
              </div>}

              <div><Link to={`/programmes/${this.state.programme.id}/items/new`} className="button">Add Item</Link></div>


              {this.state.programme.items.map(item =>

                <div key={item.id} className="card">
                  <div className="card-header">
                    <h2 className={`card-header-title title is-4 tag is-${item.day}`}> Day:{item.day}</h2>
                  </div>
                  <div className="card-content">
                    <h2 className="content text"><span className="has-text-weight-semibold">Exercise: </span>{item.exercise.name}</h2>
                    <h2 className="content text"><span className="has-text-weight-semibold">Description: </span>{item.exercise.description}</h2>
                    <img className="ShowImage" src={item.exercise.image} alt={item.exercise.name}/>
                    {item.personalbests.length > 0 &&
                      <h2 className="content text"><span className="has-text-weight-semibold">Personal Best: </span>{item.personalbests.slice(-1)[0].weight}</h2>
                    }
                    <h2 className="content text"><span className="has-text-weight-semibold">Sets: </span>{item.sets}</h2>
                    <h2 className="content text"><span className="has-text-weight-semibold">Reps: </span>{item.reps}</h2>
                  </div>
                  <hr/>
                  <div className="buttons is-centered">
                    <div><Link to={`/programmes/${this.state.programme.id}/items/${item.id}/edit`} className="button">Edit Item</Link></div>
                    <button id={item.id} className="button is-danger"
                      onClick={this.handleDeleteItems}>Delete Item</button>
                  </div>
                  <form id={item.id} onSubmit={this.handleNewPBSubmit}>
                    <div className="container">
                      <div className="field">
                        <label className="label">New PB</label>
                        <input
                          className="input"
                          type="number"
                          name="weight"
                          min="0"
                          placeholder="Input desired new Personal Best(kg)"
                          onChange={this.handleChange}
                          value={this.state.formData.weight || ''}
                        />
                      </div>
                    </div>
                    <button className="button" >Submit</button>
                  </form>
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
