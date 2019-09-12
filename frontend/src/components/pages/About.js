import React from 'react'
import AboutCard from '../common/AboutCard'


const About = () => {
  return(
    <section className="section about-background">
      <div className="container">
        <div className="box tableBorder">

          <h2 className="title is-3 about-has-white-text">About the Site</h2>
          <p>This site has been developed by Ejike Chiboka and Prash Mohan as part of a learning module in General Assembly&lsquo;s Software Engineering Immersive Course using JavaScript and React. </p>

        </div>

        <div className="box tableBorder">

          <h2>About Developers</h2>
          <hr />
          <div className="columns is-multiline">
            <div className="column is-one-quarter-desktop is-offset-one-quarter">
              <AboutCard
                name="Ejike Chiboka"
                image={'https://i.imgur.com/owdRqwP.jpg'}
                githubLink={<a href="https://github.com/agkayster" target="_blank" rel="noopener noreferrer"> <i className="fab fa-github-square"></i></a>}
                link={<a href="https://www.linkedin.com/in/ejike-chiboka-pmp-1879815a/" target="_blank" rel="noopener noreferrer"> <i className="fab fa-linkedin-in"></i></a>}
              />
            </div>

            <div className="column is-one-quarter-desktop">
              <AboutCard
                name="Prash Mohan"
                image={'https://i.imgur.com/vlFtdWv.jpg'}
                githubLink={<a href="https://github.com/strawberryrusty" target="_blank" rel="noopener noreferrer"> <i className="fab fa-github-square"></i></a>}
                link={<a href="https://www.linkedin.com/in/prash-mohan" target="_blank" rel="noopener noreferrer"> <i className="fab fa-linkedin-in"></i></a>}
              />
            </div>
          </div>

        </div>
      </div>
      <div className="box tableBorder">
        <h2>Acknowledgements</h2>
        <hr />
        <ul>Exercise Information and Gifs provided by:
          <li>• https://www.menshealth.com</li>
          <li>• https://www.crossfit.com </li>
        </ul>
      </div>


    </section>
  )
}

export default About
