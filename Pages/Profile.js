import React, { Component } from 'react';
import { Container, Header, Content, List,Thumbnail, ListItem, Text, Separator, H2,Left,Right,Button,Icon,Body,Title } from 'native-base';
import AppBar from "../Components/AppBar";
import BottomTab_1 from "../Components/BottomTab_1";
import AsyncStorage from '@react-native-community/async-storage';

export default class ListSeparatorExample extends Component {
  
  constructor(props){
    super(props);
    this.state={
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
      address:"",
    }
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
      referral_code:user.referral_code,
      address:"No : "+user.address.door_no+" "+user.address.street+","+
              user.address.town_city_village+","+user.address.state+","+
              user.address.country+".",

  });
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
         
         
          <Title>Profile Page</Title>
        
       </Right>
        
      </Header>
      
      


        <Content>
          <Separator bordered>
            <H2>Profile Detials</H2>
          </Separator>
          <ListItem>
            <Text>Name  : {this.state.username}</Text>
          </ListItem>
          <ListItem>
            <Text>Phone Number  : {this.state.phone_number}</Text>
          </ListItem>
          <ListItem last>
            <Text>Email (or) Username  : {this.state.email}</Text>
          </ListItem>
          <Separator bordered>
            <H2>ADDRESS</H2>
          </Separator>
          <ListItem>
            <Text>Address  : {this.state.address}</Text>
          </ListItem>
          <Separator bordered>
            <H2>Shop Code</H2>
          </Separator>
          <ListItem>
            <Text>Refferal Code  : {this.state.referral_code}</Text>
          </ListItem>
        </Content>
        <Button
            full
            success
            onPress={()=>this.props.navigation.navigate("Edit_profile")}
            title="Open Modal">
            <Text>Edit Profile</Text>
          </Button>
        <BottomTab_1 
        navigation={this.props.navigation}
        activeTabIcon = "profile" />
      </Container>
    );
  }
}