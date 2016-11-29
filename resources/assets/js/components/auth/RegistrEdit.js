import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom';
import Register from './Register'
import Request from 'react-http-request';
import FileInput from 'react-file-input'
import {debounce} from 'throttle-debounce';

class RegistrEdit extends Component {

  constructor(props){
        super(props);
        this.state ={
            fbObj:'',
            status: '',
            data:'',
            nameVal: '' ,
            emailVal:'',
            usernameVal:'',
            avatarVal:'',
            username:'',
            message:''
        }
        //this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.checkingUsername = debounce(500, this.checkingUsername);
    }
    handleChange(event){
        
        if(event.target.name == 'name'){
            this.setState({nameVal: event.target.value});
        }else if(event.target.name == 'email'){
            this.setState({emailVal: event.target.value});
        }
        else if(event.target.name == 'avatar'){
            event.preventDefault();
            let reader = new FileReader();
             
            let file = event.target.files[0];
            console.log(reader.result);
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    avatarVal: reader.result
                });
            }
             reader.readAsDataURL(file)
            //this.setState({avatarVal: event.target.files['0'].name});
        }
    }
    handleUsername(event){
        var _this =this;
        event.preventDefault();
        var formData = {
            username:event.target.value,
             _token: Laravel.csrfToken,
             id:this.props.params.id
        };
        _this.setState({ usernameVal: event.target.value }, _this.checkingUsername(formData));
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
    handleSave(event){
        event.preventDefault();
        this.setState({ type: 'info', message: 'Seving ...' }, this.sendFormData);
    }
    sendFormData(){
         var formData = new FormData();
        formData.append("image", this.state.file);
        formData.append("name", ReactDOM.findDOMNode(this.refs.name).value);
        formData.append("username", ReactDOM.findDOMNode(this.refs.username).value);
        formData.append("email",ReactDOM.findDOMNode(this.refs.email).value);
        formData.append("id",this.props.params.id);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var response = JSON.parse(xmlhttp.responseText);
                if (xmlhttp.status === 200 && typeof response.errors !== 'undefined') {
                   
                    this.setState({ type: 'success', errors: response.errors });
               
                }
                else if(xmlhttp.status === 200) {
                   window.location = '/users/'+response.id;
                   
                    this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later or send us an email at info@example.com.' });
                }
            }
        }.bind(this);
        xmlhttp.open('POST', '/PostAvatarUpload/'+this.props.params.id, true);
        xmlhttp.setRequestHeader('X-CSRF-Token', ReactDOM.findDOMNode(this.refs._token).value);
        xmlhttp.send(formData);
    }
    componentWillMount(){
        
        this.setState({ fbObj: localStorage.getItem('fbObj')});
        localStorage.clear();
        
    }
   
  componentDidMount(){
      if(!this.state.fbObj){
           var formData = {
                _token: Laravel.csrfToken,
                };
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === 4) {
                    var response = JSON.parse(xmlhttp.responseText);
                    if (xmlhttp.status === 200 ) {
                        this.setState({
                                status: 'ok',
                                nameVal: response.name ,
                                emailVal:response.email ,
                                usernameVal:response.username ,
                                avatarVal:'/avatar/'+response.avatar+''
                            });
                    
                    }else{
                    this.setState({ status: 'error' ,data:response});
                    
                    }
                    
                }
            }.bind(this);
            xmlhttp.open('POST', '/user/'+this.props.params.id+'', true);
            xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xmlhttp.send(this.requestBuildQueryString(formData));

      }else{
          var response = JSON.parse(this.state.fbObj);
          console.log(response.picture.data.url);
                this.setState({
                        status: 'ok',
                        nameVal: response.name ,
                        emailVal:response.email ,
                        usernameVal:'' ,
                        avatarVal:response.picture.data.url
                    });
       }
   
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
    
    
        if (this.state.status === 'error'){
           window.location = '/login';
        }
        if (this.state.type && this.state.errors) {
           if(this.state.errors.username){
                var classString = 'alert alert-danger'
                var username = <div id="username" className={classString} >
                                {this.state.errors.username}
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
                    <div className="panel-heading">Save</div>
                    <div className="panel-body">
                   
                        <form className="form-horizontal" role="form"  onSubmit={this.handleSave}>
                            <input type="hidden" name="_token" value={ Laravel.csrfToken } ref="_token"/>
                            <div className="pull-left form-group col-md-4">
                             <div className=" form-group">
                                <div className="col-md-12">
                                   <img src={this.state.avatarVal} style={{width: 200+'px', height: 150+'px'}}/>
                                   <FileInput name="avatar"
                                        accept=".png,.gif,.jpg"
                                        placeholder="My Image"
                                        className="inputClass"
                                        onChange={this.handleChange} />
                                    
                                   
                                </div>
                             </div>
                            </div>
                            <div className="pull-right form-group col-md-8">
                                <div className="form-group">
                                    <label htmlFor="name" className="col-md-4 control-label">Name</label>
                                    <div className="col-md-6">
                                        <input id="name" type="text" className="form-control" name="name" value={this.state.nameVal} onChange={this.handleChange}  ref='name' required autoFocus={true} />
                                        {name}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username" className="col-md-4 control-label">Username</label>
                                    <div className="col-md-6">
                                        <input id="username" type="text" className="form-control" value={this.state.usernameVal} onChange={this.handleUsername}  name="username" ref="username" required />
                                        {username}
                                        {userStatus}
                                    </div>
                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"  className="col-md-4 control-label">E-Mail Address</label>
                                    <div className="col-md-6">
                                        <input id="email" type="email" ref="email" className="form-control" value={this.state.emailVal} onChange={this.handleChange} name="email"  required/>
                                        {email}
                                    </div>
                                </div>

                                
                                
                           </div> 
                           <div className="form-group">
                                    <div className="col-md-6 col-md-offset-4">
                                        <button type="submit" className="btn btn-primary">
                                            Save
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

export default RegistrEdit
