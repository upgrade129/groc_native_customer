import React, { Component } from "react";
import 'react-native-gesture-handler';
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,Separator,H2, Form,Label, Button,  Left,  Right,  Body,
      Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,Textarea} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductCard from "../Components/ProductCard";
import BottomTab_1 from "../Components/BottomTab_1";
import AppBar from "../Components/AppBar";
import AsyncStorage from '@react-native-community/async-storage';



var user_detials = {};
export default class Profile extends Component {
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
     username:"",
     email:"",
     phone_number:"",
     door_no:"",
     street:"",
     town_city_village:"",
     district:"",
     state:"",
     country:"",
     referral_code:"",
    };
  }
  componentDidMount(){
    this.getuserdata();
  }

  getuserdata = async ()=>{
    const data = await AsyncStorage.getItem("@userdata");
    const user = JSON.parse(data);
   
    this.setState({
        username:user.username,
        email:user.email,
        phone_number:user.phone_number,
        door_no:user.address.door_no,
        street:user.address.street,
        town_city_village:user.address.town_city_village,
        district:user.address.district,
        state:user.address.state,
        country:user.address.country,
        referral_code:user.referral_code
    });
    
    console.log(user);
    console.log("namee",user.address);
    
  }
  
  
    email = (text) => {
        this.setState({ email: text });
        console.log("change email");
     }
  

  

  render() {
    return (
      <Container>
        <Header>
        <Left>
        <Button iconLeft onPress={()=>this.props.navigation.goBack()}>
          <Icon name='arrow-back' />
  
        </Button>
        </Left>
        <Body>
       
        <Right ><Title>Groc......</Title></Right>
        </Body>
        <Right>
         
         
          <Title>Edit Profile</Title>
        
       </Right>
        
      </Header>
        <Content>
          <Form>
          <Separator bordered>
            <H2>Profile Detials</H2>
          </Separator>
          
            <Item   >
              <Label>Username</Label>
              <input placeholder={this.state.username}
                    onChangeText ={(text)=>{this.setState({
                        username : text
                    });
                    console.log("hii");
                    }}/>
            </Item>
            <Item >
              <Label>Email</Label>
              <input placeholder={this.state.email}
              onChangeText ={this.email}/>
            </Item>
            <Item >
              <Label>Phone Number</Label>
              <input placeholder={this.state.phone_number}
              onChangeText={(text)=>this.setState({phone_number:text})}/>
            </Item>
            <Separator bordered>
            <H2>ADDRESS</H2>
          </Separator>
            <Item>
              <Label>Door Number</Label>
              <input placeholder={this.state.door_no}
              onChangeText ={(text)=>this.setState({
                door_no : text
            })}/>
            </Item>
            <Item>
              <Label>Street</Label>
              <input placeholder={this.state.street}
              onChangeText ={(text)=>this.setState({
                street : text
            })}/>
            </Item>
            <Item>
              <Label>Town (or) City (or) Village</Label>
              <input placeholder={this.state.town_city_village}
              onChangeText ={(text)=>this.setState({
                town_city_village : text
            })}/>
            </Item>
            <Item>
              <Label>District </Label>
              <input placeholder={this.state.district}
              onChangeText ={(text)=>{this.setState({
                district : text
            });
            console.log("dist",this.state.district);
        }
        }/>
            </Item>
            <Item>
              <Label>State</Label>
              <input placeholder={this.state.state}
              onChangeText ={(text)=>this.setState({
                state : text
            })}/>
            </Item>
            <Item>
              <Label>country</Label>
              <input placeholder={this.state.country}
              onChangeText ={(text)=>this.setState({
                country : text
            })}/>
            </Item>
            <Separator bordered>
            <H2>Shop Code</H2>
          </Separator>
            <Item inlineLabel>
              <Label>Refferal code</Label>
              <input placeholder={this.state.referral_code}
              onChangeText ={(text)=>this.setState({
                referral_code : text
            })}/>
            </Item>
          </Form>
        </Content>
        <Button
            full
            success
           
            title="Open Modal"
            onPress={()=>{
                const updated_data={
                    "username":this.state.username,
                    "email":this.state.email,
                    "phone_no":this.state.phone_number,
                    "referral_code":this.state.referral_code,
                    "address": {
                      "door_no": this.state.door_no,
                      "street":this.state.street,
                      "town_city_village":this.state.town_city_village,
                      "district": this.state.district,
                      "state": this.state.state,
                      "country": this.state.country,
                      
                    },
                }
                console.log("data changed",updated_data);
            }}>
            <Text>Save detials</Text>
          </Button>
          <BottomTab_1 
        navigation={this.props.navigation}
        activeTabIcon = "profile" />
      </Container>
    );
  }
}
