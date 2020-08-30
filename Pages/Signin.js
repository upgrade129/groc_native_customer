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
              <Label>Username</Label>
              <Input id="email"/>
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input id="password"/>
            </Item>
          </Form>
        
          <Button block success onPress={() => {
              
              var pass = document.getElementById("password").value;
              var user = document.getElementById("email").value;
              console.log("email",user);
              console.log("pass",pass);
              axios
              .post('https://groc-api.herokuapp.com/auth/local', {
                identifier: user,
                password: pass,
              })
              .then(response => {
                // Handle success.
                console.log('Well done!');
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
                localStorage.setItem("user",response.data.user);
                localStorage.setItem("jwt",response.data.jwt);
                this.props.navigation.navigate('Home');
     
                // this.props.history.push("/new/url")
                
              })
              .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                
                
              });
          }} >
            <Text>Sign in</Text>
          </Button>
         
          
          <Button bordered dark onPress={(e)=>this.props.navigation.navigate('Signup')}>
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
