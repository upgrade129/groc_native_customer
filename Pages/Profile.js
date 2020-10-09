import React, { Component } from "react";
import 'react-native-gesture-handler';
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab, Form,Label, Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,Textarea} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductCard from "../Components/ProductCard";
import BottomTab_1 from "../Components/BottomTab_1";
import AppBar from "../Components/AppBar"

export default class Profile extends Component {
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
     
    };
  }
  

  

  render() {
    return (
      <Container>
        <AppBar 
          navigation={this.props.navigation}
          />
        <Content>
          <Form>
            <Item inlineLabel >
              <Label>Username</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item >
              <Label>Phone Number</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Address</Label>
              <Textarea />
            </Item>
            <Item inlineLabel>
              <Label>Refferal code</Label>
              <input />
            </Item>
          </Form>
        </Content>
        <Button
            full
            success
           
            title="Open Modal">
            <Text>Save detials</Text>
          </Button>
          <BottomTab_1 
        navigation={this.props.navigation}
        activeTabIcon = "profile" />
      </Container>
    );
  }
}
