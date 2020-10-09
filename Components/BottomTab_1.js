import React, { Component } from "react";
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,} from "native-base";

export default function BottomTab({ navigation ,activeTabIcon}) {
  return (
    <Footer>
      <FooterTab>
          {activeTabIcon == "shop" ? (
      <Button
          vertical
          title="shops"
          active
        >
          <Icon type="FontAwesome" name="store" />
          <Text>shops</Text>
        </Button>):(
            <Button
            vertical
            title="shops"
            
          >
            <Icon type="FontAwesome" name="store" />
            <Text>shops</Text>
          </Button>
        )}
        {activeTabIcon == "orders" ?(
      <Button
          vertical
          title="orders"
          active
          onPress={() =>navigation.navigate("Orders")}
        >
          <Icon type="FontAwesome" name="history" />
          <Text>Orders</Text>
        </Button>):(
            <Button
            vertical
            title="orders"
            onPress={() =>navigation.navigate("Orders")}
          >
            <Icon type="FontAwesome" name="history" />
            <Text>Orders</Text>
          </Button>
        )}
        {activeTabIcon == "profile" ? (
        <Button
          vertical
          active
          title="Go to Profile"
          onPress={() =>navigation.navigate("Profile")}
        >
          <Icon type="FontAwesome" name="user" />
          <Text>Profile</Text>
        </Button>) :(
            <Button
            vertical
            title="Go to Profile"
            onPress={() =>navigation.navigate("Profile")}
          >
            <Icon type="FontAwesome" name="user" />
            <Text>Profile</Text>
          </Button>
        )}
      </FooterTab>
    </Footer>
  );
}
