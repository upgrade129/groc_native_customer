import React, { Component } from "react";
import 'react-native-gesture-handler';
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrderCard from "../Components/OrderCard";
import BottomTab_1 from "../Components/BottomTab_1";
import AppBar from "../Components/AppBar"

import {
  
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity
} from "react-native";
import BouncingPreloader from "react-native-bouncing-preloader";
import AsyncStorage from "@react-native-community/async-storage";



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

export default class Orders extends Component {
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
      orders: [],
      user_id:null,
    };
  }
  componentWillMount() {
    // It's best to use your api call on componentWillMount
    this.getorder_id();
  }

  getorder_id = async() => {
    try{
      const user =await AsyncStorage.getItem("@userdata");
      const user2 = JSON.parse(user);
      this.setState({
        user_id:user2.id,
      });
      console.log("user_id",user2.id);
      console.log("user_id",this.state.user_id);
    }
    catch (e) {
      // error reading value
      console.log(e);
    }
    var url = "https://groc-api.herokuapp.com/orders?order_status=Approved&user.id="+this.state.user_id;
    console.log(url);
    fetch(url)
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
    if(this.state.orders.length === 0){
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

    else if(this.state.orders.length !=0){
    return (
      <Container>
        
        <Content>
          {this.state.orders.map((order, i) => {
            return (
              <OrderCard
              estimated_price={order.estimated_price}
              ordered_items={order.ordered_items}
              shop_id={order.shop_id}
              navigation={this.props.navigation}
              order_id={order.id}
              />
            );
          })}
        </Content>
        
      </Container>
    );
  }
}
}
