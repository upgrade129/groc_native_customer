import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Text , Form, Item, Input, Label , Card, CardItem, Left, Body, Right, Title, View ,Icon} from 'native-base';
import axios from 'axios';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        // Initialize empty state here
        this.state = {
          name:"",
          phone:"",
          email:"",
          pass:"",
          door_no:"",
          street_name:"",
          town:"",
          dist:"",
          state:"",
          coun:"",
          referral_code:""
        };
      }


  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text style={{  fontSize: 24, fontWeight: 'bold',paddingLeft: 75, paddingRight: 50 }} >Signup</Text>
            </CardItem>
            <CardItem >
              <Body>
              <Item regular>
                    <Icon active name='ios-man  ' style={{color: '#687373'}} />
                    <Input placeholder='Username' placeholderTextColor="#687373" onChangeText={(text) => this.setState({name: text})} />
              </Item>
              </Body>
            </CardItem>
            <CardItem >
              <Body>
              <Item regular>
                    <Icon active name='ios-mail' style={{color: '#687373'}} />
                    <Input placeholder='Email' placeholderTextColor="#687373" onChangeText={(text) => this.setState({email: text})} keyboardType="email-address" />
              </Item>
              </Body>
            </CardItem>
            <CardItem >
              <Body>
              <Item regular>
                    <Icon active name='ios-keypad' style={{color: '#687373'}} />
                    <Input placeholder='Phone Number' placeholderTextColor="#687373" onChangeText={(text) => this.setState({phone: text})} />
              </Item>
              </Body>
            </CardItem>
            <CardItem >
              <Body>
                <Item regular>
                    <Icon active name='ios-lock' style={{color: '#687373'}} />
                    <Input placeholder='Password' secureTextEntry={true} placeholderTextColor="#687373" onChangeText={(text) => this.setState({pass: text})} />
                </Item>
              </Body>
            </CardItem>
            <CardItem  >
              <Body>
                <Item regular>
                    <Icon active name='ios-lock' style={{color: '#687373'}} />
                    <Input placeholder='Confirm Password' secureTextEntry={true} placeholderTextColor="#687373" onChangeText={(text) => this.setState({pass: text})} />
                </Item>
              </Body>
            </CardItem>
            <CardItem >
              <Body>
              <Item regular>
                    <Icon active name='ios-man' style={{color: '#687373'}} />
                    <Input placeholder='Door Number' placeholderTextColor="#687373" onChangeText={(text) => this.setState({door_no: text})} />
              </Item>
              </Body>
            </CardItem>
            <CardItem >
              <Body>
              <Item regular>
                    <Icon active name='ios-mail' style={{color: '#687373'}} />
                    <Input placeholder='Street Name' placeholderTextColor="#687373" onChangeText={(text) => this.setState({street_name: text})} keyboardType="email-address" />
              </Item>
              </Body>
            </CardItem>
            <CardItem >
              <Body>
              <Item regular>
                    <Icon active name='ios-keypad' style={{color: '#687373'}} />
                    <Input placeholder='Town (or) City' placeholderTextColor="#687373" onChangeText={(text) => this.setState({town: text})} />
              </Item>
              </Body>
            </CardItem>
            <CardItem >
              <Body>
              <Item regular>
                    <Icon active name='ios-mail' style={{color: '#687373'}} />
                    <Input placeholder='State' placeholderTextColor="#687373" onChangeText={(text) => this.setState({state: text})} keyboardType="email-address" />
              </Item>
              </Body>
            </CardItem>
            <CardItem >
              <Body>
              <Item regular>
                    <Icon active name='ios-keypad' style={{color: '#687373'}} />
                    <Input placeholder='Country' placeholderTextColor="#687373" onChangeText={(text) => this.setState({coun: text})} />
              </Item>
              </Body>
            </CardItem>
            <CardItem >
              <Body>
              <Item regular>
                    <Icon active name='ios-keypad' style={{color: '#687373'}} />
                    <Input placeholder='Referral Code' placeholderTextColor="#687373" onChangeText={(text) => this.setState({referral_code: text})} />
              </Item>
              </Body>
            </CardItem>
            <CardItem footer bordered>
            <View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signin')}>
                    <Text>Already Having Account?</Text>
                </TouchableOpacity>    
            </View>
            <View >
               <Button onPress={() => {
                  console.log("name",this.state.name);
                  axios
                    .post('https://groc-api.herokuapp.com/auth/local/register', {
                      username: this.state.name,
                      email: this.state.email,
                      password: this.state.pass,
                      phone_number: this.state.phone,
                    "referral_code":this.state.referral_code,
                    "address": {
                      "door_no": this.state.door_no,
                      "street":this.state.street_name,
                      "town_city_village":this.state.town,
                      "district": this.state.dist,
                      "state": this.state.state,
                      "country": this.state.coun,
                      
                    },
                    })
                    .then(response => {
                      console.log('Well done!');
                      console.log('User profile', response.data.user);
                      console.log('User token', response.data.jwt);
                      this.props.navigation.navigate('Signin');
                      Toast.show({
                        text: "Sucessfully added!",
                        buttonText: "Okay",
                        type: "success"
                      })
                    })
                    .catch(error => {
                      console.log('An error occurred:', error.response);
                    });
                            }} >
                            <Text style={{ color: '#fdfdfd' }}>Signup</Text>
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
    height: 100,
    justifyContent: 'center',
  },
});
