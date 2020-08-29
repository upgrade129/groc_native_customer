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

export default function BottomTab({ navigation }) {
  return (
    <Footer>
      <FooterTab>
        <Button
          vertical
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        >
          <Icon type="FontAwesome" name="home" />
          <Text>Home</Text>
        </Button>
        <Button
          vertical
          title="Go to Cart"
          onPress={() => navigation.navigate("Cart")}
        >
        <Icon type="FontAwesome" name="shopping-cart" />
          <Text>Cart</Text>
        </Button>
        <Button
          vertical
          title="Go to Orders"
          onPress={() => navigation.navigate("Orders")}
        >
        <Icon type="FontAwesome" name="history" />
          <Text>Orders</Text>
        </Button>
        <Button
          vertical
          title="Go to Profile"
          onPress={() => navigation.navigate("Profile")}
        >
          <Icon type="FontAwesome" name="user" />
          <Text>Profile</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}
