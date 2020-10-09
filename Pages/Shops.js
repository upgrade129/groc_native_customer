import React, { Component } from "react";
import 'react-native-gesture-handler';
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrderCard from "../Components/OrderCard";
import BottomTab from "../Components/BottomTab";
import AppBar from "../Components/AppBar"
import BottomTab_1 from "../Components/BottomTab_1";

import {
  
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity
} from "react-native";
import BouncingPreloader from "react-native-bouncing-preloader";
import Select_Shop from "../Components/select_shop";



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
      shops: [],
    };
  }
  componentWillMount() {
    // It's best to use your api call on componentWillMount
    this.getorders();
  }

  getorders() {
    fetch("https://groc-api.herokuapp.com/shops")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          shops: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if(this.state.shops.length === 0){
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

    else if(this.state.shops.length !=0){
    return (
      <Container>
        <View>
      <Header>
        
        
       
        <Title>Groc......</Title>
        
        
        
        
      </Header>
      
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="search shops" />
        </Item>
      </Header>

    </View>

        <Content>
          {this.state.shops.map((shop, i) => {
            return (
              <Select_Shop
              navigation={this.props.navigation}
              shop_name={shop.shop_name}
              shop_image={shop.image}
              shop_ratings={shop.ratings}
              shop_id={shop.id}
              />
            );
          })}
        </Content>
        
        <BottomTab_1 
        navigation={this.props.navigation}
        activeTabIcon = "shop" />
      </Container>
    );
  }
}
}
