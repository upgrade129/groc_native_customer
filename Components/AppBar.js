import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Item,
  Input,
  Segment,
  Card,
  CardItem,
  Thumbnail,
  View,
} from "native-base";

export default function AppBar(props) {
  return (
    <View>
      <Header>
        <Left />
        <Body>
          <Title>Groc</Title>
        </Body>
        <Right />
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
