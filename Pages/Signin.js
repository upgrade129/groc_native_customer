import React, { Component } from 'react';
import { Container, Header, Content, Button, Text , Form, Item, Input, Label , Left, Body, Right, Title, View } from 'native-base';
import axios from 'axios';

export default class ButtonBlockExample extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            pass:""
        };
    }
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
              <Input onChangeText={(text)=>this.setState({email:text})}/>
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input onChangeText={(text)=>this.setState({pass:text})}/>
            </Item>
          </Form>
        
          <Button block success onPress={() => {
              
             console.log("username",this.state.email);
              axios
              .post('https://groc-api.herokuapp.com/auth/local', {
                identifier: this.state.email,
                password: this.state.pass,
              })
              .then(response => {
                // Handle success.
                console.log('Well done!');
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
                async()=>{
                try {
                    const jsonValue = JSON.stringify(response.data.user);
                    await AsyncStorage.setItem('@userdata', jsonValue)
                    await AsyncStorage.setItem('@jwt', response.data.jwt);
                    console.log("Data stored");
                  } catch (e) {
                    // saving error
                  }
                }
                this.props.navigation.navigate('Home');
     
                // this.props.history.push("/new/url")
                
              })
              .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                this.props.navigation.navigate('Home');
                
                
              });
          }} >
            <Text>Sign in</Text>
          </Button>
         
          
          <Button bordered dark onPress={(e)=>this.props.navigation.navigate('Signup')}>
            <Text>SIGN UP</Text>
          </Button>
      
      <Button bodered danger onPress={(e)=>this.props.navigation.navigate('forgetpass')}>
            <Text>FORGET pass</Text>
          </Button>
          </Content>
          
        
        
      </Container>
    );
  }
}
