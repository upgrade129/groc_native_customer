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
      data: [1,2],
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
      const jsonValue_byoffer = await AsyncStorage.getItem("offer");
      var parsedJson_offer = jsonValue_byoffer != null ? JSON.parse(jsonValue_byoffer) : null;
      console.log("offer",parsedJson_offer);
      const jsonValue = await AsyncStorage.getItem("local");
      var parsedJson = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log("all",parsedJson);
      const jsonValue_bycategory = await AsyncStorage.getItem("local_category");
      var parsedJson_category = jsonValue_bycategory != null ? JSON.parse(jsonValue_bycategory) : null;
      console.log("category",parsedJson_category);
      const jsonValue_bycombo = await AsyncStorage.getItem("local_combo");
      var parsedJson_combo = jsonValue_bycombo != null ? JSON.parse(jsonValue_bycombo) : null;
      console.log("combo",parsedJson_combo);
      var children = [...parsedJson_offer,... parsedJson,...parsedJson_category,...parsedJson_combo];
      
      
      console.log("children",children);
      var filterded = children.filter(function (el){
        return el != null;
      });
      this.setState({
        cart_items: filterded,
      });
      // console.log("Data Set");
      console.log("cart_items",this.state.cart_items);
    } catch (e) {
      // error reading value
    }
  };



  
  delete_items(index){
    console.log("index",index);
    
    
    // var deleted_list=this.state.cart_items;
    // deleted_list.splice(index,1);
    // this.setState({
    //   cart_items: deleted_list,
    // });
    
    // console.log("removed index",index);

  }

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
          <AppBar placeholder="Search Products"
          navigation={this.props.navigation}/>
          <Content>
            {this.state.cart_items ? (
              this.state.cart_items.map((cart_item, i) => {
                console.log(cart_item);
                return (
                  <CartCard
                    image={cart_item.image}
                    name={cart_item.name}
                    price={cart_item.price}
                    quantity={cart_item.quantity}
                    unit={cart_item.unit}
                    index={i}
                    remove_item={this.delete_items}
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
                this.props.navigation.navigate("Checkout");
               
            }}
            title="Open Modal">
            <Text>Check Out</Text>
          </Button>
          <BottomTab navigation={this.props.navigation} 
          activeTabIcon = "cart"/>
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