import React from 'react'




const Card = (props) => {
  return (
    <div className="card tableBorder">
      <div className="card-header">
        <div className="card-header-title">{props.name}</div>
      </div>
      <div className="card-image">
        <figure className="image is-3by2">
          <img src={props.image} alt={props.name} className="card-image"/>
        </figure>
        <div className="card-content">
          <p className="notes">{props.location}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
