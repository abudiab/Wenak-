import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Flag, Dropdown } from 'semantic-ui-react'
import Logo2 from '../assets/logo2.png'
import $ from 'jquery';
import { Link } from "react-router-dom";



class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      password: "",
      type:"",
    }
    //this.getUserType();
    this.handleChange = this.handleChange.bind(this);
     this.login = this.login.bind(this);
  }

 //update the user
  updateState(data){
    this.setState({
      type:data
    })               
  }

//login user
  login(){
   // event.preventDefault();
    var mobilenum= this.state.mobile;
    var password = this.state.password;
    var that = this;
    console.log("Hi I'm inside login post")
  $.ajax({
    type: "POST",
    url: "/api/auth/login",
    data:{
       mobilenum : mobilenum,
        password : password
    }, 
    datatype: "json",
    success:function(res){
        console.log("sucess login the user");
        console.log("Hi I'm inside login post")
        alert("Hello "+mobilenum);
        var type = res.type;
        var token = localStorage.setItem('usertoken', res.token);
        localStorage.setItem('usertoken',res.token);
        console.log(localStorage.getItem('usertoken'));
        console.log(type);
        if(type === "Customer"){
          window.location="/NavbarUser";
        }
        else{
          window.location="/DriverOrd";
        }
      },
    error: function(request, status, error) {
          console.log("error in mobilenumor password");
          alert("Error in mobilenum or password")}
        });
      }
   

// //get the user type inorder to redirect him 
//   getUserType(){
//     //var token = config['secret'];
//     var token=localStorage.getItem('usertoken');
//     if (token) {
//     console.log("get the type of user");
//     var that = this;
//     $.ajax({
//       type: "GET",
//       url:"/api/auth/usertype", 
//       beforeSend: function (xhr){ 
//         xhr.setRequestHeader('x-access-token', token); 
//         xhr.setRequestHeader('Accept', 'application/json'); 
//       },
//       datatype: "json",
//       success:function(data){
//           that.updateState(data);
//           console.log(data);
//           if(data === "Driver"){
//           console.log("Hello Driver")
//           }else{
//             console.log("Hello Customer")
//           }
//       },
//       error: function(request, status, error) {
//             console.log(error);
//         }
//     });
//   }
// }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='yellow' textAlign='center'>
            <Image src={Logo2} /> Log-in to your account
          </Header>
          <Form size='large'>
          {/* <Form size='large' onSubmit={this.handleSubmit}> */}
            <Segment stacked>
              <Form.Input name="mobile" 
              fluid 
              icon='phone' 
              iconPosition='left' 
              placeholder='+970' 
              // type='number'
              value={this.state.mobile} onChange={this.handleChange} />
              <Form.Input
                name="password"
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={this.state.password} onChange={this.handleChange}
              />
              
              <Button color='yellow' fluid size='large' type='submit'  onClick={this.login}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            <Link to={"/UserForm"}>Sign Up</Link>
          </Message>
          
        </Grid.Column>
      </Grid>
    )
  }
}
export default LoginForm;
