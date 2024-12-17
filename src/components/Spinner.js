import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <div className="spinner-border" style={{width: '5rem', height: '5rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>  
      </div>
    )
  }
}   

export default Spinner
