import React from 'react'
import AboutCard from '../common/AboutCard'


const About = () => {
  return(
    <section className="section about-background">
      <div className="container">
        <div className="box tableBorder">

          <h2 className="title is-3 has-white-text">About the Site</h2>
          <p>This site has been developed by Ejike Chiboka and Prash Mohan as part of a learning module in General Assembly&lsquo;s Software Engineering Immersive Course using JavaScript and React. </p>

        </div>

        <div className="box tableBorder">

          <h2>About Developers</h2>
          <hr />

          <div className="column is-one-quarter-desktop is-offset-one-half">
            <AboutCard
              name="Ejike Chiboka"
              image={'https://i.imgur.com/owdRqwP.jpg'}
              githubLink={<a href="https://github.com/agkayster" target="_blank" rel="noopener noreferrer"> <i className="fab fa-github-square"></i></a>}
              link={<a href="https://www.linkedin.com/in/ejike-chiboka-pmp-1879815a/" target="_blank" rel="noopener noreferrer"> <i className="fab fa-linkedin-in"></i></a>}
            />
          </div>

          <div className="column is-one-quarter-desktop is-offset-one-half">
            <AboutCard
              name="Prash Mohan"
              image={'https://i.imgur.com/vlFtdWv.jpg'}
              githubLink={<a href="https://github.com/strawberryrusty" target="_blank" rel="noopener noreferrer"> <i className="fab fa-github-square"></i></a>}
              link={<a href="https://www.linkedin.com/in/prash-mohan" target="_blank" rel="noopener noreferrer"> <i className="fab fa-linkedin-in"></i></a>}
            />
          </div>

        </div>
      </div>
      <div className="box tableBorder">
        <h2>Acknowledgements</h2>
        <hr />
        <ul>Background images - Unsplash artists:
          <li>• Organic carrots - Harshal S. Hirve</li>
          <li>• Plant box - Markus Spiske</li>
          <li>• Tomatos, Onions & Potatos - Lars Blankers</li>
          <li>• Market Greens - Lou Liebau</li>
          <li>• Apples - Akshay Nanavati</li>
        </ul>
        <p>Icons made by smalllikeart from www.flaticon.com</p>
        <p>Smiling Carrot from www.vegetableislands.com</p>
      </div>


    </section>
  )
}

export default About
