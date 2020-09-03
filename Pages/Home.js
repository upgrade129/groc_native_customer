import React, { Component } from "react";
import 'react-native-gesture-handler';
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductCard from "../Components/ProductCard";
import BottomTab from "../Components/BottomTab";
import AppBar from "../Components/AppBar"

export default class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
      products: [],
      selected_products:[]
    };
  }
  componentWillMount() {
    // It's best to use your api call on componentWillMount
    this.getProducts();
  }

  getProducts() {
    fetch("https://groc-api.herokuapp.com/products")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          products: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getselected_items(val){
      // vicky add ur code here
       console.log("sucessfully added",val);
  }

  render() {
    return (
      <Container>
        <AppBar placeholder="Search Products"/>
        <Content>
          {this.state.products.map((product, i) => {
            return (
              <ProductCard
                image={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                unit={product.unit}
                id={product.id}
                added_items={this.getselected_items}
              />
            );
          })}
        </Content>
        <BottomTab navigation={this.props.navigation}/>
      </Container>
    );
  }
}
