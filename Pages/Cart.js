import React, { Component } from "react";
import "react-native-gesture-handler";
import axios from "axios";
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
import ShopCard from "../Components/ShopCard";
import BottomTab from "../Components/BottomTab";
import AppBar from "../Components/AppBar";
import {
  
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity
} from "react-native";
import BouncingPreloader from "react-native-bouncing-preloader";

const icons = [
  "https://www.shareicon.net/data/256x256/2016/05/04/759946_bar_512x512.png",
  "https://www.shareicon.net/data/256x256/2016/05/04/759908_food_512x512.png",
  "https://www.shareicon.net/data/256x256/2016/05/04/759956_food_512x512.png",
  "https://www.shareicon.net/data/256x256/2016/05/04/759954_food_512x512.png",
  "https://www.shareicon.net/data/256x256/2016/05/04/759906_food_512x512.png",
  "https://www.shareicon.net/data/256x256/2016/05/04/759921_food_512x512.png"
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});

var shop_array=null;
class Cart extends Component {
  constructor(props) {
    super(props);

    // Initialize empty state here
    this.state = {
      cart_items: null,
      data: [],
    };
  }
  componentWillMount() {
    this.getData();
  }

  storeShopArray=async(list)=>{
    try {
        const jsonValue = JSON.stringify(list);
        await AsyncStorage.setItem('shopArray', jsonValue)
        console.log("a stored");
      } catch (e) {
        console.log(e);
      }
    }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("local");
      var parsedJson = jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({
        cart_items: parsedJson,
      });
      // console.log("Data Set");
      console.log(parsedJson);
    } catch (e) {
      // error reading value
    }
  };



  getStoreData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("shopArray");
      var parsedJson = jsonValue != null ? JSON.parse(jsonValue) : null;
      return parsedJson;
    } catch (e) {
      // error reading value
    }
  };

  render() {
    if(this.state.cart_items === null){
      return(
        <View style={styles.container}>
        <BouncingPreloader
          icons={icons}
          leftDistance={-100}
          rightDistance={-150}
          speed={1000}
        />
      </View>);
    }
    else if(this.state.cart_items.length != null){
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
                this.props.navigation.navigate("SelectShop");
            }}
            title="Open Modal">
            <Text>Check Out</Text>
          </Button>
          <BottomTab navigation={this.props.navigation} />
        </Container>
      );
    }
    
  }
}

function ModalScreen({ navigation }) {
  
  //TODO list shops in this modal
  return (
    <Container>
      {/* <Text>{this.state.cart_items}</Text> */}
      <Content>
        {shop_array.map((shop, i) => {
          return <ShopCard shop_id="jn" shop_score={shop.shop_score} />;
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


// var data = {
            //   ordered_items: [
            //     {
            //       image:
            //         "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/carrots.jpg",
            //       name: "Carrot",
            //       price: 20,
            //       id: "5f317f6227b9d004ac3313b2",
            //       quantity: 3,
            //     },
            //     {
            //       image:
            //         "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/cashews.jpg",
            //       name: "Cashews ",
            //       price: 30,
            //       id: "5f317fc627b9d004ac3313b3",
            //       quantity: 2,
            //     },
            //   ],
            // };



            // fetch("http://localhost:1337/find-best-shop", {
            //   method: "post",
            //   // mode: "no-cors", // no-cors, *cors, same-origin
            //   headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json",
            //   },
            //   body: data,
            // })
            //   .then(function (response) {
            //     return response.json();
            //   })
            //   .then(function (responseData) {
            //     console.log(responseData);
            //   })
            //   .catch((error) => {
            //     console.error(error);
            //   });