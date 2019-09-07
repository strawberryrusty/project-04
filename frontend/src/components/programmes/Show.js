import React from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'
// import Auth from '../../lib/Auth'


class ProgrammesShow extends React.Component {
  constructor(){
    super()

    this.state = {

    }
  }

  componentDidMount(){
    axios.get(`/api/programmes/${this.props.match.params.id}`)
      .then(res => this.setState({programme: res.data}))
  }

  render(){
    if(!this.state.programme) return null
    return (
      <section className="section">
        <div className="container">
          <div className="column is-half-tablet">
            <h1 className="title is-2">{this.state.programme.name}</h1>
            <h2 className="subtitle is-4">{this.state.programme.items}</h2>
          </div>
        </div>
      </section>
    )
  }
}
export default ProgrammesShow
