import React, { Component } from "react";
import 'react-native-gesture-handler';
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card, Form, CardItem,  Thumbnail,} from "native-base";
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

import Carousel from 'react-native-banner-carousel';
import {  Image,  Dimensions } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
 
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;


// import ReactDOM from "react-dom";
// import Carousel from "react-elastic-carousel";
// import Items from "../Components/banner_item";
// import "../styles/banner.css";


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

// const breakPoints = [
//     { width: 1, itemsToShow: 2 },
//     { width: 550, itemsToShow: 2, itemsToScroll: 2 },
//     { width: 768, itemsToShow: 3 },
//     { width: 1200, itemsToShow: 4 }
//   ];

const images = [
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300"
];


export default function Shop_dashboard({ route, navigation }) {
   
  const { shop_name } = route.params;
  const { otherParam } = route.params;

  
  return(
      <Dashboard 
      shop_name={shop_name}
      navigation={navigation}
      />
  )
} 
 class Dashboard extends Component {
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
      categories:[],
      shop_id:null,
      sub_categories :[],
      sub_products : []
      
    };
  }

  
  componentDidMount(){
    this.getshop_id();
    this.getcategories();
  }

  getshop_id = async()=>{
    try {
      await AsyncStorage.setItem('level', 0);
      await AsyncStorage.setItem('local_category', "[]");
      await AsyncStorage.setItem('offer', "[]");
      await AsyncStorage.setItem('local', "[]");
      await AsyncStorage.setItem('local_combo', "[]");
      const shop_id = await AsyncStorage.getItem("shop_id");
      this.setState({
        shop_id: shop_id,
      });
      
    } catch (e) {
      // error reading value
    }
  }

  getcategories(){
    fetch("https://strapi-grock.herokuapp.com/categories?level=0")
      .then((response) => response.json())
      .then((responseJson) => {
        var list=[];
        responseJson.map((category,i) => {
           list.push({"category_id":category.id,
                        "level" : category.level,
                      "category_name" : category.name}) ;
        });
        this.setState({
          categories: list,
        });
        console.log("categories",this.state.categories);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  
  renderPage(image, index) {
    return (
        <View key={index}>
            <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
        </View>
    );
}  


 

  render() {

    if(this.state.categories.length === 0){
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

    else if(this.state.categories.length !=0){
      return (
        <Container>
        <AppBar placeholder="Search category"
        navigation={this.props.navigation}
        shop_name={this.props.shop_name}/>
        <Content>
       
    <View style={styles.container}>
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                    {images.map((image, index) => this.renderPage(image, index))}
                </Carousel>
            </View>

            {this.state.categories.map((item,i) => {
                return(
                  <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri:"" }} />
            <Body>
              <Text>{item.category_name}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Right>
            <Button  onPress={()=>{

this.props.navigation.navigate("ProductsByCategory",
{category_id:item.category_id,
  level : 1,
}); 
      
          }
  
            }>
              <Text>Buy from this category</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
                );
            })}

            
        
        </Content>
        <BottomTab navigation={this.props.navigation}
        activeTabIcon = "dashboard"/>
      </Container>
        
      );

    }
    }
  }

    
        

