import React, { Component } from "react";
import "react-native-gesture-handler";
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-community/async-storage';
import Home from "./Pages/Home";
import CartStackScreen from "./Pages/Cart";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import SelectShop from "./Pages/SelectShop";

import AppBar from "./Components/AppBar";

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
      products: [],
    };
    const Stack = createStackNavigator();
  }
  componentWillMount() {
    // It's best to use your api call on componentWillMount
    this.getProducts();
  }

  getProducts() {
    fetch("https://groc-api.herokuapp.com/products")
      .then((response) => response.json())
      .then((responseJson) => {
        // this.storeData([]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@cart_items', jsonValue)
      console.log("Data stored");
    } catch (e) {
      // saving error
    }
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Cart" component={CartStackScreen} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="SelectShop" component={SelectShop} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
