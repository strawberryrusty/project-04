import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'


class App extends React.Component {
  componentDidMount(){
    axios.get('/api/gymapp/')
      .then(res => console.log(res.data))
  }
  render(){
    return (
      <h1> Hello Gymapp</h1>
    )
  }
}
ReactDom.render(
  <App />,
  document.getElementById('root')
)
