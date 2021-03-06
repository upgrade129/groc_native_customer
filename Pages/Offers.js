import React, { Component } from "react";
import 'react-native-gesture-handler';
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card, Form, CardItem,  Thumbnail, Root} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductCard from "../Components/ProductCard";
import ProductCard_category from "../Components/ProductCard_category";
import BottomTab from "../Components/BottomTab";
import AppBar from "../Components/AppBar";
import AsyncStorage from '@react-native-community/async-storage';
import { isLoading } from "expo-font";
import {
  
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity
} from "react-native";
import BouncingPreloader from "react-native-bouncing-preloader";
import OfferCard from "../Components/OfferCard";

var id ="";
var list_offer=[];
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

export default function ProductsByCategory({ route, navigation }) {
   
    
    
    
    return(
        <ProductsByCategoryClass 
        
        navigation={navigation}
       
        />
    )
}  

 class ProductsByCategoryClass extends Component {
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
      products: [],
      selected_products:[],
      loading:true,
      shop_id:""
    };
  }
  
  
  storelist=async(list)=>{
    try {
        const jsonValue = JSON.stringify(list);
        await AsyncStorage.setItem('offer', jsonValue)
        console.log("offer items stored");
      } catch (e) {
        // saving error
      }
    }

    
  
  componentWillMount() {
    // It's best to use your api call on componentWillMount
    this.getshop_id();
    
    
  }

  updateData = async (value) => {
    try {
      var cart_items = await AsyncStorage.getItem('@cart_items')
      cart_items=JSON.parse(cart_items);
      const jsonValue = JSON.stringify(value)
      cart_items.push(jsonValue);
      cart_items=JSON.stringify(cart_items);
      await AsyncStorage.setItem('@cart_items', cart_items)
      console.log("Data stored");
    } catch (e) {
      // saving error
      console.log(e)
    }
  }

  getshop_id = async () => {
    try {
      const shop_id = await AsyncStorage.getItem("shop_id");
      id=shop_id;
      this.setState({
        shop_id: shop_id,
      });
      console.log("asyn",shop_id);
    } catch (e) {
      // error reading value
    }
    var url = "https://strapi-grock.herokuapp.com/shop-products?on_offer=true&shop.id="+this.state.shop_id;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          products: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };


//   getProducts() {
    
    
//     fetch("https://groc-api.herokuapp.com/products?on_offer=true&shop_id="+this.state.shop_id)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({
//           products: responseJson,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

  getselected_items(val){
      list_offer.push(val);
       console.log("sucessfully added",list_offer);
  }

  render() {

    if(this.state.products.length === 0){
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

    else if(this.state.products.length !=0){
      return (
        <Container>
            
          <AppBar placeholder="Search Products"
          navigation={this.props.navigation}/>
          <Content>
          {console.log("map",this.state.products)}
            {
            this.state.products.map((product, i) => {
              
              return (
                <OfferCard
                  image={product.image}
                  name={product.name}
                  mrp_price={product.mrp_price}
                  quantity={product.quantity}
                  unit={product.unit}
                  id={product.id}
                  added_items={this.getselected_items}
                  offer_price={product.offer_price}
                />
              );
            })}
          </Content>
          
          <Footer>
        <FooterTab>
        <Button
            vertical
            
            title="Go to Home"
            onPress={() => {
              this.props.navigation.navigate("Shop_dashboard");
              this.storelist(list_offer);}}
          >
            <Icon type="FontAwesome" name="paper-plane" />
            <Text>Dashboard</Text>
          </Button>
          <Button
            vertical
            title="Go to Home"
            onPress={() =>{ 
              this.props.navigation.navigate("Home",
              );
              this.storelist(list_offer);}}
          >
            <Icon type="FontAwesome" name="home" />
            <Text>All Products</Text>
          </Button>
          <Button
            vertical
            
            title="Go to Cart"
            onPress={() => {
              this.props.navigation.navigate('Cart');
              console.log("bottomTab",list_offer);
              // localStorage.setItem("local",JSON.stringify(list));
              this.storelist(list_offer);
              
              
            }}
          >
          <Icon type="FontAwesome" name="shopping-cart" />
            <Text>Cart</Text>
          </Button>
          
          <Button
            vertical
            active
            title="Go to offers"
            onPress={() =>{ 
              this.props.navigation.navigate("Offers");
              this.storelist(list_offer);
            }}
          >
            <Icon type="FontAwesome" name="user" />
            <Text>Offers</Text>
          </Button>
          <Button
            vertical
            title="Go to combos"
            onPress={() => {this.props.navigation.navigate("Combos");
            this.storelist(list_offer);}}
          >
            <Icon type="FontAwesome" name="user" />
            <Text>Combos</Text>
          </Button>
        </FooterTab>
      </Footer>
  
        </Container>
      );

    }
    


    }
    
  }


