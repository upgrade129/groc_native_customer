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
  Toast,
  Body,
  Icon,
  Text,
  Item,
  Input,
  Segment,
  Card,
  CardItem,
  Thumbnail,
} from "native-base";
import { InputAccessoryView, Alert } from "react-native";

export default function ViewOrderHeader({ username, price }) {
  return (
    <Header>
      <Body>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {username}'s Order
        </Text>
      </Body>
      <Right>
        <Button>
          <Text>Rs:{price}</Text>
        </Button>
      </Right>
    </Header>
  );
}