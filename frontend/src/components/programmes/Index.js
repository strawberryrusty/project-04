import React, {Component} from 'react'
import axios from 'axios'
import Card from '../common/Card'

import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

class ProgrammesIndex extends Component {

  constructor() {
    super()
    this.state = {

    }

  }

  componentDidMount() {
    axios.get('/api/programmes/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ programmes: res.data }))
  }

  canModify(){
    return Auth.isAuthenticated() && Auth.getPayload().sub === this.state.programme.user.id
  }




  render() {

    return (
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">

            {!this.state.programmes && <h2 className="title is-2">Loading...</h2>}

            {this.state.programmes && !this.state.programmes.length && <h2 className="title is-2">Please go to Add Programme and create a Programme</h2>}

            {this.state.programmes && this.state.programmes.map(programme =>
              <div className="column is-one-third-desktop" key={programme.id}>
                <Link to={`/programmes/${programme.id}`}>
                  <Card
                    name={programme.name}
                    image={programme.image}
                  />
                </Link>
              </div>
            )}

          </div>
        </div>
      </section>
    )
  }
}

export default ProgrammesIndex
