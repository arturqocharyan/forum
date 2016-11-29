import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router'
import {debounce} from 'throttle-debounce';

class Register extends Component {
    constructor(props){
        super(props);
          this.state ={
            type: '',
            registr: '',
            username:'',
            errors:[]
            
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.checkingUsername = debounce(500, this.checkingUsername);
    }
    
    handleSubmit(event){
        event.preventDefault();
        this.setState({ type: 'info', message: 'Seving ...' }, this.sendFormData);
    }
    handleUsername(event){
        var _this =this;
        event.preventDefault();
        var formData = {
            username:event.target.value,
             _token: Laravel.csrfToken,
             
        };
        _this.setState({ username: 'Seving' }, _this.checkingUsername(formData));
    }
    checkingUsername(data){
            var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var response = JSON.parse(xmlhttp.responseText);
               
                if (xmlhttp.status === 200 && response === 1) {
                    this.setState({ username: 'danger' ,message:'Username is already taken'});
               
                }
                
            }
        }.bind(this);
        xmlhttp.open('POST', '/checkingUsername', true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(this.requestBuildQueryString(data));
    }
    
    sendFormData(){
        var formData = {
            _token: ReactDOM.findDOMNode(this.refs._token).value,
            name: ReactDOM.findDOMNode(this.refs.name).value,
            username: ReactDOM.findDOMNode(this.refs.username).value,
            email: ReactDOM.findDOMNode(this.refs.email).value,
            password: ReactDOM.findDOMNode(this.refs.password).value,
            password_confirmation: ReactDOM.findDOMNode(this.refs.password_confirmation).value,
            
            };
            var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var response = JSON.parse(xmlhttp.responseText);
                if (xmlhttp.status === 200 && typeof response.errors !== 'undefined') {
                   
                    this.setState({ type: 'success', errors: response.errors });
               
                }
                else if(xmlhttp.status === 200) {
                   window.location = '/registersUsers/'+response.id+'/'+response.username;
                   
                    this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later or send us an email at info@example.com.' });
                }
            }
        }.bind(this);
        xmlhttp.open('POST', 'register', true);
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
    componentWillMount(){
        
    }
  
    render() {
        var csrfToken =Laravel.csrfToken;
        if (this.state.type && this.state.errors) {
            if(this.state.errors.password){
                var classString = 'alert alert-danger'
                var password = <div id="password" className={classString} >
                                {this.state.errors.password}
                            </div>;
            }else if(this.state.errors.email){
                var classString = 'alert alert-danger'
                var email = <div id="email" className={classString}>
                                {this.state.errors.email}
                            </div>;
            }else if(this.state.errors.name){
                var classString = 'alert alert-danger'
                var name = <div id="name" className={classString} >
                                {this.state.errors.name}
                            </div>;
            }else if(this.state.errors.username){
                var classString = 'alert alert-danger'
                var username = <div id="username" className={classString} >
                                {this.state.errors.username}
                            </div>;
            }else{
                var classString = 'alert alert-' + this.state.type;
                var status = <div id="status" className={classString} ref="status">
                                {this.state.errors.password}
                            </div>;
                }
            }
            
       
           if(this.state.username === 'danger'){
                
                var classString = 'alert alert-danger'
                var userStatus = <div id="userStatus" className={classString} ref="statuserStatusus">
                                {this.state.message}
                            </div>;
            } 
    return (
            <div className="col-md-8 col-md-offset-2">
                <div className="panel panel-default">
                    <div className="panel-heading">Register</div>
                    <div className="panel-body">
                    {status}
                        <form className="form-horizontal" role="form"  onSubmit={this.handleSubmit}>
                            <input type="hidden" name="_token" value={ csrfToken } ref="_token"/>
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-4 control-label">Name</label>
                                <div className="col-md-6">
                                    <input id="name" type="text" className="form-control" name="name"  ref='name' required autoFocus={true} />
                                    {name}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="col-md-4 control-label">Username</label>
                                <div className="col-md-6">
                                    <input id="username" type="text" className="form-control" onKeyUp={this.handleUsername} name="username" ref="username" required />
                                    {userStatus}
                                    {username}
                                </div>
                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"  className="col-md-4 control-label">E-Mail Address</label>
                                <div className="col-md-6">
                                    <input id="email" type="email" ref="email" className="form-control" name="email"  required/>
                                    {email}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="col-md-4 control-label">Password</label>
                                <div className="col-md-6">
                                    <input id="password" type="password" ref="password" className="form-control" name="password" required/>
                                    {password}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password-confirm" className="col-md-4 control-label">Confirm Password</label>
                                <div className="col-md-6">
                                    <input id="password-confirm" type="password" className="form-control" ref="password_confirmation" name="password_confirmation" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-md-6 col-md-offset-4">
                                    <button type="submit" className="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    
    )
  }

}

export default Register