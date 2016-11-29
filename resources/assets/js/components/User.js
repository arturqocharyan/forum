import React, { Component } from 'react'
import { Link } from 'react-router'
import Request from 'react-http-request';
class User extends Component {
  constructor(props){
        super(props);
        this.state ={
            status: '',
            data:'',
        }
        console.log(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
  componentDidMount(){
    var formData = {
          _token: Laravel.csrfToken,
        };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
            var response = JSON.parse(xmlhttp.responseText);
            
            if (xmlhttp.status === 200 ) {
              
               this.setState({ status: 'ok' ,data:response});
            }else{
              this.setState({ status: 'error' ,data:response});
               
            }
            
        }
    }.bind(this);
    xmlhttp.open('POST', '/user/'+this.props.params.id+'', true);
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
    if(this.state.status === 'ok' && this.state.data){
        var content = <div className="col-md-8 col-md-offset-2">
                          <p>{this.state.data.name}</p>
                          <p>{this.state.data.email}</p>
                          <p>{this.state.data.username}</p>
                          <img src={'/avatar/'+this.state.data.avatar+''} className='userImg img-responsive'/>
                      </div>
                  console.log(content);    
      
    }else if (this.state.status === 'error'){
           window.location = '/login';
    }
    return (
            <div id='user'>
              {content}
            </div>
            )
    }

}

export default User
