import React, { Component } from "react";
import 'react-native-gesture-handler';
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card, Form, CardItem,  Thumbnail,} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
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

  updateData = async (value) => {
    try {
      var cart_items = await AsyncStorage.getItem('@cart_items')
      cart_items=JSON.parse(cart_items);
      const jsonValue = JSON.stringify(value)
      cart_items.push(jsonValue);
      cart_items=JSON.stringify(cart_items);
      await AsyncStorage.setItem('@cart_items', cart_items)
      console.log("Data stored");
    } catch (e) {
      // saving error
      console.log(e)
    }
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
      // this.setState({ selected_products: [...this.state.selected_products, JSON.stringify(val)] }) //simple value

      // this.setState(prevState => ({
      //   selected_products: [...prevState.selected_products, JSON.stringify(val)]
      // }))
      var oldarr=this.state.selected_products;


      console.log(oldarr)
      // console.log(val)
      // oldarr.push(JSON.stringify(val))
      // // console.log(this.state.selected_products)
      // this.setState({ selected_products: oldarr })

      // this.updateData(val)
      console.log(val)
      // console.log(val)
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

