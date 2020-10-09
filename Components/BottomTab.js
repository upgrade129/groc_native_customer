import React, { Component } from "react";
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,} from "native-base";

export default function BottomTab({ navigation ,activeTabIcon}) {
  return (
    <Footer>
      <FooterTab>
      {activeTabIcon == "dashboard" ?(
        <Button
          vertical
          active
          title="Dashboard"
          onPress={() => navigation.navigate("Shop_dashboard")}
        >
        <Icon type="FontAwesome" name="paper-plane" />
          <Text>Dashboard</Text>
        </Button>):(
          <Button
          vertical
          title="Dashboard"
          onPress={() => navigation.navigate("Shop_dashboard")}
        >
        <Icon type="FontAwesome" name="paper-plane" />
          <Text>Dashboard</Text>
        </Button>

        )}
        {activeTabIcon == "Allproducts" ?(
        <Button
          vertical
          active
          title="All products"
          onPress={() => navigation.navigate("Home")}
        >
          <Icon type="FontAwesome" name="home" />
          <Text>All Products</Text>
        </Button>
        ):(
          <Button
          vertical
          title="All products"
          onPress={() => navigation.navigate("Home")}
        >
          <Icon type="FontAwesome" name="home" />
          <Text>All Products</Text>
        </Button>
        )}
        
        {activeTabIcon == "cart" ? (
        <Button
          vertical
          active
          title="Go to Cart"
          onPress={() => navigation.navigate("Cart")}
        >
        <Icon type="FontAwesome" name="shopping-cart" />
          <Text>Cart</Text>
        </Button>):(
          <Button
          vertical
          title="Go to Cart"
          onPress={() => navigation.navigate("Cart")}
        >
        <Icon type="FontAwesome" name="shopping-cart" />
          <Text>Cart</Text>
        </Button>

        )}
        {activeTabIcon == "offers" ? (
        <Button
          vertical
          active
          title="Go to offers"
          onPress={() => navigation.navigate("Offers")}
        >
        <Icon type="FontAwesome" name="history" />
          <Text>Orders</Text>
        </Button>):(
          <Button
          vertical
          title="Go to offers"
          onPress={() => navigation.navigate("Offers")}
        >
        <Icon type="FontAwesome" name="history" />
          <Text>Offers</Text>
        </Button>

        )}
        {activeTabIcon == "combos" ?(
        <Button
          vertical
          active
          title="Go to combos"
          onPress={() => navigation.navigate("Combos")}
        >
          <Icon type="FontAwesome" name="user" />
          <Text>Combos</Text>
        </Button>):(
          <Button
          vertical
          title="Go to Profile"
          onPress={() => navigation.navigate("Combos")}
        >
          <Icon type="FontAwesome" name="user" />
          <Text>Combos</Text>
        </Button>
        )}
      </FooterTab>
    </Footer>
  );
}
