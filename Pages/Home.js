import React, { Component } from "react";
import 'react-native-gesture-handler';
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item, Picker, Input,  Segment,  Card, Form, CardItem,  Thumbnail,} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductCard from "../Components/ProductCard";
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


var list=[];
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

export default class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
      products: [],
      selected_products:[],
      loading:true,
      category:"ALL",
      shop_id:"",
      
    };
  }

  storelist=async(list)=>{
    try {
        const jsonValue = JSON.stringify(list);
        await AsyncStorage.setItem('local', jsonValue)
        console.log("a stored");
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
      
      this.setState({
        shop_id: shop_id,
      });
      console.log("asyn",this.state.shop_id);
    } catch (e) {
      // error reading value
    }
    var url="https://strapi-grock.herokuapp.com/shop-products?shop.id="+this.state.shop_id;
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
  }

  getselected_items(val){
      list.push(val);
       console.log("sucessfully added",list);
       
  }

  onValueChange2(value) {
    this.setState({
      category: value
    });
    
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
          navigation={this.props.navigation}
          />
          
          <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.category}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="ALL" value="ALL" />
                <Picker.Item label="Vegetables" value="Vegetables" />
                <Picker.Item label="Fruits" value="Fruits" />
                <Picker.Item label="Debit Card" value="Debit Card" />
                <Picker.Item label="Credit Card" value="Credit Card" />
                <Picker.Item label="Net Banking" value="Net Banking" />
              </Picker>
            </Item>
          <Content>

            {this.state.products.map((product, i) => {

              if("ALL"==this.state.category){
                return (
                  <ProductCard
                    image={product.image}
                    name={product.name}
                    mrp_price={product.mrp_price}
                    quantity={product.quantity}
                    unit={product.unit}
                    id={product.id}
                    added_items={this.getselected_items}
                  />
                )
              }
              else if(product.category==this.state.category){
                return (
                  <ProductCard
                    image={product.image}
                    name={product.name}
                    mrp_price={product.mrp_price}
                    quantity={product.quantity}
                    unit={product.unit}
                    id={product.id}
                    added_items={this.getselected_items}
                  />
              );
            
            }
            })}
          </Content>
          <Footer>
        <FooterTab>
          
          <Button
          vertical
          title="Dashboard"
          onPress={() => {
            this.props.navigation.navigate("Shop_dashboard")
            this.storelist(list);
          }}
        >
        <Icon type="FontAwesome" name="paper-plane" />
          <Text>Dashboard</Text>
        </Button>
        <Button
            vertical
            active
            title="all products"
            
          >
            <Icon type="FontAwesome" name="home" />
            <Text>All products</Text>
          </Button>
          <Button
            vertical
            title="Go to Cart"
            onPress={() => {
              this.props.navigation.navigate('Cart');
              console.log("bottomTab",list);
              // localStorage.setItem("local",JSON.stringify(list));
              this.storelist(list);
              
              
            }}
          >
          <Icon type="FontAwesome" name="shopping-cart" />
            <Text>Cart</Text>
          </Button>
          
          <Button
            vertical
            title="Go to Profile"
            onPress={() =>{
               this.props.navigation.navigate("Offers")
            this.storelist(list);}}
          >
            <Icon type="FontAwesome" name="user" />
            <Text>Offers</Text>
          </Button>
          <Button
            vertical
            title="Go to Profile"
            onPress={() =>{
               this.props.navigation.navigate("Combos")
            this.storelist(list);}}
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


