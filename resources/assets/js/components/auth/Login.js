import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import User from '../../components/User'
import FacebookLogin from 'react-facebook-login';
import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';

 const responseFacebook = (response) => {
            localStorage.setItem('fbObj', JSON.stringify(response));
                if(localStorage.getItem('fbObj')){
                    window.location = '/redirect';
                }
           
        }

class Login extends Component {
    constructor(props){
        super(props);
          this.state ={
            type: '',
            login: '',
         }
        this.handleLogin = this.handleLogin.bind(this);
        
    }
    
    handleLogin(event){
        event.preventDefault();
        this.setState({ type: 'info', message: 'Seving ...' }, this.sendFormData);
    }
    sendFormData(){
        var formData = {
            _token: Laravel.csrfToken,
            email: ReactDOM.findDOMNode(this.refs.email).value,
            password: ReactDOM.findDOMNode(this.refs.password).value,
           };
            var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var response = JSON.parse(xmlhttp.responseText);
                if (xmlhttp.status === 200 && typeof response.errors !== 'undefined') {
                   this.setState({ type: 'success', errors: response.errors });
               }
                else if(xmlhttp.status === 200 && response.login) {
                    <User data={response}/>
                    window.location = 'users/'+response.id;
                   console.log(<User data={response}/>);
                    this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later or send us an email at info@example.com.' });
                }
            }
        }.bind(this);
        xmlhttp.open('POST', 'login', true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(this.requestBuildQueryString(formData));
    }
    requestBuildQueryString (params) {
    var queryString = [];
    for(var property in params)
      if (params.hasOwnProperty(property)) {
        queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
      }
    return queryString.join('&');
    }
    render() {
        var csrfToken =Laravel.csrfToken;
    return (
            
            <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
                <div className="panel-heading">Login</div>
                <div className="panel-body">
                    <form className="form-horizontal" role="form" method="POST" action="/login" onSubmit={this.handleLogin}>
                       <input type="hidden" name="_token" value={ csrfToken } />
                        <div className="form-group">
                            <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>
                            <div className="col-md-6">
                                <input id="email"  type="email" className="form-control" name="email" ref="email" required autoFocus={true} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="col-md-4 control-label">Password</label>
                            <div className="col-md-6">
                                <input id="password" type="password" className="form-control" name="password" ref="password" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-6 col-md-offset-4">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" /> Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-8 col-md-offset-4">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                                <FacebookLogin
                                    appId="308191196223395"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    size = "150"
                                    cssClass="my-facebook-button-class btn btn-primary"
                                    icon={<TiSocialFacebookCircular />}
                                    />
                                <a className="btn btn-link" href="/password/reset">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    
    )
  }

}

export default Login