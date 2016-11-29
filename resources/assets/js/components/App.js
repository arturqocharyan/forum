import React, { Component } from 'react'
import { Link } from 'react-router'

class App extends Component {

  render() {
      
    return (
      <div className="content">
            <div className="header">
                <div className="center-block col-md-10 ">
                    <div className="logoCodeRiders col-md-3" >
                        <img src="/images/logo/mini.png" className="img-responsive" />
                    </div>
                    <div className="top-right links col-md-4">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                </div>
            </div>
            <div className="center-block col-md-10">
            {this.props.children}
                
                
            </div>
            
            
        </div>
        </div>
    )
  }

}

export default App
