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


var list_category=[];
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
   
    const { category } = route.params;
    const { otherParam } = route.params;
    const { shop_name } = route.params;
    
    console.log("cat",{category});
    return(
        <ProductsByCategoryClass 
        category={category}
        navigation={navigation}
        shop_name={shop_name}
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
      shop_id:"",
      
    };
  }
  
  
  storelist=async(list)=>{
    try {
        const jsonValue = JSON.stringify(list);
        await AsyncStorage.setItem('local_category', jsonValue)
        console.log("a stored");
      } catch (e) {
        // saving error
      }
    }

    
  
  componentWillMount() {
    // It's best to use your api call on componentWillMount
    this.getshop_id();
    console.log("class",this.props.category);
    
  }

  
  getshop_id = async () => {
    try {
      const shop_id = await AsyncStorage.getItem("shop_id");
      
      this.setState({
        shop_id: shop_id,
      });
      console.log("asyn",shop_id);
    } catch (e) {
      console.log(e);
    }
      var url="https://groc-api.herokuapp.com/products?category="+this.props.category+"&shop.id="+this.state.shop_id;
      console.log("url",url);
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
      list_category.push(val);
       console.log("sucessfully added",list_category);
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
            {this.state.products.map((product, i) => {
              
              return (
                <ProductCard_category
                  image={product.image}
                  name={product.name}
                  mrp_price={product.mrp_price}
                  quantity={product.quantity}
                  unit={product.unit}
                  id={product.id}
                  added_items={this.getselected_items}
                />
              );
            })}
          </Content>
          
          <Footer>
        <FooterTab>
        <Button
            vertical
            active
            title="Go to Home"
            onPress={() => {
              this.props.navigation.navigate("Shop_dashboard");
              this.storelist(list_category);}}
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
              this.storelist(list_category);}}
          >
            <Icon type="FontAwesome" name="home" />
            <Text>All Products</Text>
          </Button>
          <Button
            vertical
            title="Go to Cart"
            onPress={() => {
              this.props.navigation.navigate('Cart');
              console.log("bottomTab",list_category);
              // localStorage.setItem("local",JSON.stringify(list));
              this.storelist(list_category);
              
              
            }}
          >
          <Icon type="FontAwesome" name="shopping-cart" />
            <Text>Cart</Text>
          </Button>
          
          <Button
            vertical
            title="Go to offers"
            onPress={() =>{ 
              this.props.navigation.navigate("Offers");
              this.storelist(list_category);
            }}
          >
            <Icon type="FontAwesome" name="user" />
            <Text>Offers</Text>
          </Button>
          <Button
            vertical
            title="Go to combos"
            onPress={() => {this.props.navigation.navigate("Combo");
            this.storelist(list_category);}}
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


