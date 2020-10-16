import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Text , Form, Item, Input, Label ,Icon ,Card, CardItem, Left, Body, Right, Title, View } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

export default class Signin extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            pass:""
        };
    }

    storeuserdata = async(value)=>{
      try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('@userdata', jsonValue)
          console.log("Data stored");
        } catch (e) {
          // saving error
        }
      }

      storejwt = async(value)=>{
        try {
            
            await AsyncStorage.setItem('@jwt', value);
            console.log("Data stored");
          } catch (e) {
            // saving error
          }
        }

       
        

  render() {
    return (
      <Container style={styles.container}>
          <Content style={{ marginTop:50 }} >
            <Card>
              <CardItem header bordered>
                <Text style={{ fontSize: 24, fontWeight: 'bold', paddingLeft: 75, paddingRight: 50 }}>Sign In</Text>
              </CardItem>
              <CardItem >
                <Body>
                  <Item regular>
                    <Icon active name='ios-man' style={{ color: '#687373' }} />
                    <Input placeholder='Username' onChangeText={(text)=>this.setState({email:text})} placeholderTextColor="#687373" />
                  </Item>
                </Body>
              </CardItem>
              <CardItem >
                <Body>
                  <Item regular>
                    <Icon active name='ios-lock' style={{ color: '#687373' }} />
                    <Input placeholder='Password' onChangeText={(text)=>this.setState({pass:text})} secureTextEntry={true} placeholderTextColor="#687373" />
                  </Item>
                  <TouchableOpacity onPress={(e)=>this.props.navigation.navigate('forgetpass')}>
                    <Text style={{ marginTop: 10  }} >Forgot Password?</Text>
                  </TouchableOpacity>
                </Body>
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
                  <TouchableOpacity onPress={(e)=>this.props.navigation.navigate('Forgetpass')}>
                    <Text>Forget Password</Text>
                  </TouchableOpacity>
                </View>
                </CardItem>
                <CardItem footer bordered>
                 <View style={{ paddingLeft: 20 }}>
                    <Button onPress={() => {
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
                        this.storeuserdata(response.data.user);
                        this.storejwt(response.data.jwt);
                        this.props.navigation.navigate('Shops');
              
                        // this.props.history.push("/new/url")
                        
                      })
                      .catch(error => {
                        // Handle error.
                        console.log('An error occurred:', error.response);
                        this.props.navigation.navigate('Shops');
                        
                        
                      });
                      }} >
                      <Text style={{ color: '#fdfdfd', textAlign: 'right' }}>Login</Text>
                    </Button>
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