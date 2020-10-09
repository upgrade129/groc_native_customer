import React, { Component } from "react";
import 'react-native-gesture-handler';
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,Textarea,  Left,Form,Picker,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrderCard from "../Components/OrderCard";
import BottomTab from "../Components/BottomTab";
import AppBar from "../Components/AppBar";
import AsyncStorage from '@react-native-community/async-storage';


import {
  
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity
} from "react-native";
import BouncingPreloader from "react-native-bouncing-preloader";
import axios from 'axios';




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


 var ordered_items=[];
 
 var total_price=0;
 export default class Checkout extends Component {

  
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
        selected: undefined,
        selected_payment:undefined,
        cart_items:null,
        shop_id:null,
      
    };
  }

  

  componentDidMount(){
    this.getData();
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("local");
      var parsedJson = jsonValue != null ? JSON.parse(jsonValue) : null;
      const jsonValue_bycategory = await AsyncStorage.getItem("local_category");
      var parsedJson_category = jsonValue_bycategory != null ? JSON.parse(jsonValue_bycategory) : null;
      const jsonValue_byoffer = await AsyncStorage.getItem("local_offer");
      var parsedJson_offer = jsonValue_bycategory != null ? JSON.parse(jsonValue_byoffer) : null;
      var children = parsedJson.concat(parsedJson_category);
      children = children.concat(parsedJson_offer);
      parsedJson = children;
      console.log("children",children);
      this.setState({
        cart_items: parsedJson,
      });
      const shop_id = await AsyncStorage.getItem("shop_id");
      this.setState({
        shop_id: shop_id,
      });
      // console.log("Data Set");
      console.log("cart_items-----check",this.state.cart_items);
    } catch (e) {
      // error reading value
    }
  };
  

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  onValueChange_payment(value) {
    this.setState({
      selected: value
    });
  }

  clear_localstorage = async () =>{
    let keys = ['local', 'local_offer','local_category'];
                AsyncStorage.multiRemove(keys, (err) => {
                  console.log("not cleared");
                });
  }
  render() {
    
    return (
        
              <Container>
                <AppBar 
          navigation={this.props.navigation}/>
                <Content>
                    <Text>Select delivery</Text>
                  <Form>
                    <Picker
                      mode="dropdown"
                      iosHeader="Select your SIM"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange.bind(this)}
                    >
                      <Picker.Item label="Home delivery" value="Home delivery" />
                      <Picker.Item label="Takeaway" value="Takeaway" />
                      
                    </Picker>
                  </Form>
                  <Text>
                      ADDRESS
                  </Text>
                  <Form>
            <Textarea rowSpan={5} bordered placeholder="Textarea" />
          </Form>
          <Text>Payment option</Text>
          <Form>
                    <Picker
                      mode="dropdown"
                      iosHeader="Select your SIM"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange_payment.bind(this)}
                    >
                      <Picker.Item label="Cash on delivery" value="Cash on delivery" />
                      <Picker.Item label="Online payment" value="Online payment" />
                      
                    </Picker>
                  </Form>
                  
                </Content>
                
                <Button
            full
            success
            onPress={() => {
              
                console.log("ckeck",this.state.cart_items);
              this.state.cart_items.map((item,i)=>{
                  
                    ordered_items.push({
                      product:item.id,
                      quantity:item.quantity,
                      price:item.price
                   
                  });
                  total_price=total_price+item.price;
              })
              
              console.log("checkout-ordered",ordered_items);
              const data={
                "order_status": "Pending",
                "order_type": "TAKEAWAY_COD_FixedPrice",
                "user": "5f2d271172904b00fe911e45",
                "shop": this.state.shop_id,
                "ordered_items": ordered_items,
                   "price": total_price.toString()
              }
                console.log("data",data);
                axios
                .post('https://groc-api.herokuapp.com/orders',data)
                .then(response => {
                  // Handle success.
                  console.log("order posted ")
                })
                .catch(error => {
                  // Handle error.
                  console.log('An error occurred:', error.response);
                  
                  
                  
                });
                this.clear_localstorage();
            }}
            title="Open Modal">
            <Text>Place the order</Text>
          </Button>
              </Container>
            );
          }
         
}
