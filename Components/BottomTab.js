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
} from "native-base";

export default function BottomTab({navigation}) {
  return (
    <Footer>
      <FooterTab>
        <Button
          vertical
          title="Go to Jane's profile"
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="apps" />
          <Text>Home</Text>
        </Button>
        <Button
          vertical
          title="Go to Jane's profile"
          onPress={() => navigation.navigate("Orders")}
        >
          <Icon name="camera" />
          <Text>Orders</Text>
        </Button>
        <Button
          vertical
          title="Go to Jane's profile"
          onPress={() => navigation.navigate("Profile")}
        >
          <Icon name="navigate" />
          <Text>Profile</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}
