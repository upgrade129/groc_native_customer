import React, { Component } from 'react';
import { Container, Header, Content, Button, Text , Form, Item, Input, Label , Left, Body, Right, Title, View ,Icon} from 'native-base';
import axios from 'axios';

export default class ButtonBlockExample extends Component {
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
          pincode:""
        };
      }


  render() {
    return (
      <Container>
        <Header>
          <Left>
          <Button iconLeft onPress={()=>this.props.navigation.navigate('Signin')}>
            <Icon name='home' />
            
          </Button>
          </Left>
          <Body>
            <Title>GROC</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Form>
        <Item inlineLabel>
              <Label>Name</Label>
              <Input  onChangeText={(text) => this.setState({name: text})}/>
            </Item>
            <Item inlineLabel last>
              <Label>Phone no</Label>
              <Input onChangeText={(text) => this.setState({phone: text})}/>
            </Item>
            <Item inlineLabel>
              <Label>Email</Label>
              <Input onChangeText={(text) => this.setState({email: text})}/>
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input onChangeText={(text) => this.setState({pass: text})}/>
            </Item>
            <Item inlineLabel>
              <Label>Door_NO:</Label>
              <Input  onChangeText={(text) => this.setState({door_no: text})}/>
            </Item>
            <Item inlineLabel last>
              <Label>Street Name</Label>
              <Input onChangeText={(text) => this.setState({street_name: text})}/>
            </Item>
            <Item inlineLabel>
              <Label>Town or City</Label>
              <Input onChangeText={(text) => this.setState({town: text})}/>
            </Item>
            <Item inlineLabel last>
              <Label>District</Label>
              <Input onChangeText={(text) => this.setState({dist: text})}/>
            </Item>
            <Item inlineLabel last>
              <Label>State</Label>
              <Input onChangeText={(text) => this.setState({state: text})}/>
            </Item>
            <Item inlineLabel>
              <Label>Country</Label>
              <Input onChangeText={(text) => this.setState({coun: text})}/>
            </Item>
            <Item inlineLabel last>
              <Label>PinCode</Label>
              <Input onChangeText={(text) => this.setState({pincode: text})}/>
            </Item>
          </Form>
        
          <Button block success onPress={() => {
            //   var name = document.getElementById("name").value;
            //   var phone = document.getElementById("phone").value;
            //   var pass = document.getElementById("password").value;
            //   var email = document.getElementById("email").value;
              console.log("name",this.state.name);
              
              axios
                .post('https://groc-api.herokuapp.com/auth/local/register', {
                  username: this.state.name,
                  email: this.state.email,
                  password: this.state.pass,
                  phone_number: this.state.phone,
                  door_no: this.state.door_no,
                  street_name:this.state.street_name,
                  town_or_city: this.state.town,
                  district:this.state.dist,
                  state:this.state.state,
                  country:this.state.coun,
                  pincode:this.state.pincode
                })
                .then(response => {
                  // Handle success.
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
                  // Handle error.
                  console.log('An error occurred:', error.response);
                });
                
     
               
                
           
          }} >
            <Text>continue</Text>
          </Button>
         
          
          
          </Content>
          
        
        
      </Container>
    );
  }
}
