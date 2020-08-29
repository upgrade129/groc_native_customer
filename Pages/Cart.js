import React, { Component } from "react";
import "react-native-gesture-handler";
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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

import CartCard from "../Components/CartCard";
import BottomTab from "../Components/BottomTab";
import AppBar from "../Components/AppBar";

class Cart extends Component {
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
      cart_items: null,
    };
  }
  componentWillMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@cart_items");
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({
        cart_items: data,
      });
      // console.log("Data Set");
      console.log(jsonValue);
    } catch (e) {
      // error reading value
    }
  };

  render() {
    return (
      <Container>
        <Content>
          {this.state.cart_items ? (
            this.state.cart_items.map((cart_item, i) => {
              return (
                <CartCard
                  image={cart_item.image}
                  name={cart_item.name}
                  price={cart_item.price}
                  quantity={cart_item.quantity}
                  unit={cart_item.unit}
                />
              );
            })
          ) : (
            <Text>Loading</Text>
          )}
        </Content>

        <Button
          full
          success
          onPress={() => {
            var data={
              ordered_items:this.state.cart_items
            }
            fetch("http://groc-api.herokuapp.com/find-best-shop", {
              method: "post",
              mode: 'no-cors', // no-cors, *cors, same-origin
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                ordered_items:this.state.cart_items
              }),
            })
              .then(function (response) {
                return response.json();
              })
              .then(function (responseData) {
                console.log(responseData)
              })
              .catch((error) => {
                console.error(error);
              });
              console.log(JSON.stringify({
                ordered_items:this.state.cart_items
              }))
            // this.props.navigation.navigate("Details");
          }}
          title="Open Modal"
        >
          <Text>Check Out</Text>
        </Button>

        <BottomTab navigation={this.props.navigation} />
      </Container>
    );
  }
}

function ModalScreen({ navigation }) {
  //TODO list shops in this modal
  return (
    <Container>
      <Text>{this.state.cart_items}</Text>
      <Button full dark onPress={() => navigation.goBack()}>
        <Text>Go back</Text>
      </Button>
    </Container>
  );
}

const MainStack = createStackNavigator();
export default function CartStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={Cart} />
      <MainStack.Screen name="Details" component={ModalScreen} />
    </MainStack.Navigator>
  );
}
