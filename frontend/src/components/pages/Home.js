import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <h1 className="title display is-1">Swole</h1>
          <div className="subtitle display is-4">Create the perfect programme</div>
          <div className="buttons is-left">
            <Link to="/register" className="button is-black is-large is-outlined level-item home-buttons">Register</Link>
            <Link to="/login" className="button is-black is-large is-outlined level-item home-buttons">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
