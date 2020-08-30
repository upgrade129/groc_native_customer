import React, { Component } from 'react';
import { Container, Header, Content, Button, Text , Form, Item, Input, Label , Left, Body, Right, Title, View } from 'native-base';
import axios from 'axios';

export default class ButtonBlockExample extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>GROC</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Form>
        <Item inlineLabel>
              <Label>Name</Label>
              <Input id="name"/>
            </Item>
            <Item inlineLabel last>
              <Label>Phone no</Label>
              <Input id="phone"/>
            </Item>
            <Item inlineLabel>
              <Label>Email</Label>
              <Input id="email"/>
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input id="password"/>
            </Item>
          </Form>
        
          <Button block success onPress={() => {
              var name = document.getElementById("name").value;
              var phone = document.getElementById("phone").value;
              var pass = document.getElementById("password").value;
              var email = document.getElementById("email").value;
              console.log("email",email);
              console.log("pass",pass);
              axios
                .post('https://groc-api.herokuapp.com/auth/local/register', {
                  username: name,
                  email: email,
                  password: pass,
                })
                .then(response => {
                  // Handle success.
                  console.log('Well done!');
                  console.log('User profile', response.data.user);
                  console.log('User token', response.data.jwt);
                  this.props.navigation.navigate('Signin');
                })
                .catch(error => {
                  // Handle error.
                  console.log('An error occurred:', error.response);
                });
                
     
               
                
           
          }} >
            <Text>Sign in</Text>
          </Button>
         
          
          <Button bordered dark>
            <Text>SIGN UP</Text>
          </Button>
      
      <Button bodered danger>
            <Text>FORGET pass</Text>
          </Button>
          </Content>
          
        
        
      </Container>
    );
  }
}
