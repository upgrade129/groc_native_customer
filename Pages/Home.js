import React, { Component } from "react";
import 'react-native-gesture-handler';
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card, Form, CardItem,  Thumbnail,} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductCard from "../Components/ProductCard";
import BottomTab from "../Components/BottomTab";
import AppBar from "../Components/AppBar";
import AsyncStorage from '@react-native-community/async-storage';


var list=[];

export default class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
      products: [],
      selected_products:[]
    };
  }

  storelist=async(list)=>{
    try {
        const jsonValue = JSON.stringify(list);
        await AsyncStorage.setItem('local', jsonValue)
        console.log("a stored");
      } catch (e) {
        // saving error
      }
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
      list.push(val);
       console.log("sucessfully added",list);
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
        <Footer>
      <FooterTab>
        <Button
          vertical
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Icon type="FontAwesome" name="home" />
          <Text>Home</Text>
        </Button>
        <Button
          vertical
          title="Go to Cart"
          onPress={() => {
            this.props.navigation.navigate('Cart');
            console.log("bottomTab",list);
            // localStorage.setItem("local",JSON.stringify(list));
            this.storelist(list);
            
            
          }}
        >
        <Icon type="FontAwesome" name="shopping-cart" />
          <Text>Cart</Text>
        </Button>
        <Button
          vertical
          title="Go to Orders"
          onPress={() => this.props.navigation.navigate("Orders")}
        >
        <Icon type="FontAwesome" name="history" />
          <Text>Orders</Text>
        </Button>
        <Button
          vertical
          title="Go to Profile"
          onPress={() => this.props.navigation.navigate("Profile")}
        >
          <Icon type="FontAwesome" name="user" />
          <Text>Profile</Text>
        </Button>
      </FooterTab>
    </Footer>

      </Container>
    );
  }
}
