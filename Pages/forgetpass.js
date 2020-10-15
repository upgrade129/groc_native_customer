import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Text , Form, Item, Input, Label ,Icon ,Card, CardItem, Left, Body, Right, Title, View } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


export default class Signin extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            
        };
    }

    
  render() {
    return (
      <Container style={styles.container}>
          <Content style={{ marginTop:50 }} >
            <Card>
              <CardItem header bordered>
                <Text style={{ fontSize: 24, fontWeight: 'bold', paddingLeft: 75, paddingRight: 50 }}>Forget Password</Text>
              </CardItem>
              <CardItem >
                <Body>
                  <Item regular>
                    <Icon active name='ios-man' style={{ color: '#687373' }} />
                    <Input placeholder='Enter Email Address' onChangeText={(text)=>this.setState({email:text})} placeholderTextColor="#687373" />
                  </Item>
                </Body>
              </CardItem>
              
              <CardItem footer bordered>
              <View style={{ paddingLeft: 20 }}>
                    <Button onPress={() => {
                     axios
                     .post('https://groc-api.herokuapp.com/auth/forgot-password', {
                       email: this.state.email,
                     })
                     .then(response => {
                       // Handle success.
                       console.log('Your user received an email');
                     })
                     .catch(error => {
                       // Handle error.
                       console.log('An error occurred:', error.response);
                     });
                      }} >
                      <Text style={{ color: '#fdfdfd', textAlign: 'right' }}>Send Recovery Mail</Text>
                    </Button>
                  </View>
                  </CardItem>
                  <CardItem footer bordered>
                <View>
                  <TouchableOpacity onPress={(e)=>this.props.navigation.navigate('Signup')}>
                    <Text>Not Having Account?</Text>
                  </TouchableOpacity>
                </View>
                </CardItem>
                <CardItem footer bordered>
                <View>
                  <TouchableOpacity onPress={(e)=>this.props.navigation.navigate('Signin')}>
                    <Text>Allready having an Account</Text>
                  </TouchableOpacity>
                </View>
                 
              </CardItem>
            </Card>
          </Content>
            
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#3a57c9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});