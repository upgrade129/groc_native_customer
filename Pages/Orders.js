import React, { Component } from "react";
import 'react-native-gesture-handler';
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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductCard from "../Components/ProductCard";
import BottomTab from "../Components/BottomTab";
import AppBar from "../Components/AppBar"

export default class Orders extends Component {
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
      orders: [],
    };
  }
  componentWillMount() {
    // It's best to use your api call on componentWillMount
    this.getorders();
  }

  getorders() {
    fetch("https://groc-api.herokuapp.com/orders")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          orders: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <Container>
        <AppBar placeholder="Search Orders"/>
        <Content>
          {/* {this.state.orders.map((product, i) => {
            return (
              <ProductCard
                image={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                unit={product.unit}
              />
            );
          })} */}
          <Text>Welcome to Orders!</Text>
        </Content>
        <BottomTab navigation={this.props.navigation}/>
      </Container>
    );
  }
}
