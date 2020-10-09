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
import Shops from "./Pages/Shops";
import select_shop from './Components/select_shop';
import AppBar from "./Components/AppBar";
import Shop_dashboard from "./Pages/Shop_dashboard";
import ProductsByCategory from "./Pages/ProductsByCategory";
import Checkout from "./Pages/Checkout";
import Offers from "./Pages/Offers";
import Combos from "./Pages/Combos";
import test from "./Pages/test";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://groc-api.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});


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
      <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Shop_dashboard" component={Shop_dashboard} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Cart" component={CartStackScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="SelectShop" component={SelectShop} />
          <Stack.Screen name="Shops" component={Shops} />
          <Stack.Screen name="select_shop" component={select_shop} />
          <Stack.Screen name="ProductsByCategory" component={ProductsByCategory} />
          <Stack.Screen name="Offers" component={Offers} />
          <Stack.Screen name="Combos" component={Combos} />
          <Stack.Screen name="test" component={test} />

          
        </Stack.Navigator>
      </NavigationContainer>
      </ApolloProvider>
    );
  }
}
