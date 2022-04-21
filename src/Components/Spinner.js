import React, { Component } from 'react'
 import './Spinner.css'

export class Spinner extends Component {
    render() {
        return (
            <div className="app"  >
                <div className="loader-wrapper">
                    <div className="loader">
                         <div className='loader loader-inner'></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Spinner
