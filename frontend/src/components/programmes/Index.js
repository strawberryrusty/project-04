import React, {Component} from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

class ProgrammesIndex extends Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    axios.get('/api/programmes/')
      .then(res => this.setState({ programmes: res.data }))
  }

  render() {
    console.log(this.state.programmes)
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">

            {!this.state.programmes && <h2 className="title is-2">Loading...</h2>}

            {this.state.programmes && this.state.programmes.map(programme =>
              <div className="column is-one-quarter-desktop" key={programme.id}>
                <Link to={`/programmes/${programme.id}`}>
                  <div className="card">
                    <div className="card-header">
                      <h2 className="card-header-title">{programme.name}<button className="button">Delete</button></h2>
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

export default ProgrammesIndex
