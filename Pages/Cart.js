import React, { Component } from "react";
import "react-native-gesture-handler";
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

import CartCard from "../Components/CartCard";
import ShopCard from "../Components/ShopCard";
import BottomTab from "../Components/BottomTab";
import AppBar from "../Components/AppBar";

const data = {
  shop_product_id_array: [
    {
      shop_id: "5f3630a5fee41a005ff2d047",
      available_products: [
        {
          id: "5f317f6227b9d004ac3313b2",
          price: 23,
        },
        {
          id: "5f317fc627b9d004ac3313b3",
          price: 60,
        },
        {
          id: "5f31801227b9d004ac3313b4",
          price: 50,
        },
      ],
      shop_score: 3,
    },
    {
      shop_id: "5f392e2a7b25630017007fec",
      available_products: [
        {
          id: "5f317f6227b9d004ac3313b2",
          price: 23,
        },
        {
          id: "5f31801227b9d004ac3313b4",
          price: 50,
        },
      ],
      shop_score: 2,
    },
    {
      shop_id: "5f393a820afaa700f8545c98",
      available_products: [
        {
          id: "5f317f6227b9d004ac3313b2",
          price: 23,
        },
        {
          id: "5f317fc627b9d004ac3313b3",
          price: 60,
        },
      ],
      shop_score: 2,
    },
  ],
  product_id_array: [
    "5f317f6227b9d004ac3313b2",
    "5f317fc627b9d004ac3313b3",
    "5f31801227b9d004ac3313b4",
  ],
};

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
            var data = {
              ordered_items: this.state.cart_items,
            };
            fetch("http://groc-api.herokuapp.com/find-best-shop", {
              method: "post",
              mode: "no-cors", // no-cors, *cors, same-origin
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ordered_items: this.state.cart_items,
              }),
            })
              .then(function (response) {
                return response.json();
              })
              .then(function (responseData) {
                console.log(responseData);
              })
              .catch((error) => {
                console.error(error);
              });
            console.log(
              JSON.stringify({
                ordered_items: this.state.cart_items,
              })
            );
            this.props.navigation.navigate("Details");
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
      {/* <Text>{this.state.cart_items}</Text> */}
      <Content>
      {data.shop_product_id_array.map((shop, i) => {
        return (
          <ShopCard
          shop_id={shop.shop_id}
          shop_score={shop.shop_score}
          />
        );
      })}
      </Content>
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
