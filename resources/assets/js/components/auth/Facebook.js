import React from 'react';
import FacebookLogin from 'react-facebook-login';
 
class Facebook extends React.Component {
  constructor(props) {
      super(props);
       this.state ={
            fbObj: localStorage.getItem('fbObj'),
            registr: '',
            username:'',
            errors:[]
            
        }
  };
 
  
  render() {
     
    return (
     <div />
    )
  }
}
 
export default Facebook;