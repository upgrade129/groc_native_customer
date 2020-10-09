import React, { Component } from "react";
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,  View,} from "native-base";

export default function AppBar(props) {
  return (
    <View>
      <Header>
        <Left>
        <Button iconLeft onPress={()=>props.navigation.goBack()}>
          <Icon name='arrow-back' />
  
        </Button>
        </Left>
        <Body>
       
        <Right ><Title>Groc......</Title></Right>
        </Body>
        <Right>
        <Button  >
         
          <Text>Become a customer</Text>
        </Button>
        </Right>
        
      </Header>
      
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder={props.placeholder} />
        </Item>
      </Header>

    </View>
  );
}
