import React, { Component } from "react";
import 'react-native-gesture-handler';
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,Separator,  Button, List,ListItem, Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card, Form, CardItem,  Thumbnail, Root} from "native-base";
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
   
    const { category_id } = route.params;
    const { otherParam } = route.params;
    const { level } = route.params;
    const { categories } = route.params;
    const { products } = route.params;
    
    return(
        <ProductsByCategoryClass 
        category_id={category_id}
        navigation={navigation}
        level={level}
        categories={categories}
        products={products}
        />
    )
}  

 class ProductsByCategoryClass extends Component {
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
      products: this.props.products,
      selected_products:[],
      loading:true,
      shop_id:"",
      level:props.level,
      categories:this.props.categories,
      category_id:this.props.category_id,
      
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
    // this.getcategories();
    this.getshop_id();
    console.log("23456789",this.state.products);
    console.log("3456789",this.state.categories);
    
    
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
  }

  // getcategories(){
  //   var url="https://strapi-grock.herokuapp.com/categories?id="+this.props.category_id;
  //   console.log("url",url);
  // fetch(url)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
    //   var category_list=[];
    //   var featured_products=[];
    //   responseJson[0].featured_products.map((category,i) => {
    //     featured_products.push({"product_id":category.id,
    //     "product_image" : category.image,
    //                "unit" : category.unit,
    //                "mrp_price" : category.mrp_price,
    //                "name" : category.name}) ;
    //  });
    //   responseJson[0].sub_categories.map((category,i) => {
    //     category_list.push({"category_id":category.id,
    //                   "level" : category.level,
    //                 "category_name" : category.name}) ;
    //   });
//       this.setState({
//         categories: responseJson[0].sub_categories,
//         products: responseJson[0].featured_products
//       });
//       console.log("categories",this.state.categories);
//       console.log("featured products",this.state.products);
//     // console.log(this.state.categories[0].sub_categories);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
  
      

  getselected_items(val){
      list_category.push(val);
       console.log("sucessfully added",list_category);
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
            
          <AppBar placeholder="Search Products"
          navigation={this.props.navigation}/>
          <Separator bordered>
            <Text>SUB CATEGRIES</Text>
          </Separator>
          {this.state.categories.map((item,i) => {
            return(
              <List >
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: item.image }} />
              </Left>
              <Body>
                <Text>{item.name}</Text>
                <Button
                //  onPress={()=>{
                // // this.props.navigation.setParams(
                // // {category_id:category.id,
                // //   level : this.state.level+1});     
                // //             }
                // this.props.navigation.navigate("ProductsByCategory",
                //   {category_id:category.id,
                //     level : this.state.level+1});     
                //               }
                //           }
                onPress={()=>{
                  var url="https://strapi-grock.herokuapp.com/categories?id="+item.id;
                  console.log("url",url);
                fetch(url)
                  .then((response) => response.json())
                  .then((responseJson) => {
                    this.setState({
                     sub_categories: responseJson[0].sub_categories,
                     sub_products : responseJson[0].featured_products
                    });
                    
                    console.log("sub_categories",this.state.sub_categories);
                    console.log("featured products",this.state.sub_products);
                  // console.log(this.state.categories[0].sub_categories);
                  this.props.navigation.navigate("ProductsByCategory",
               {category_id:item.category_id,
                 level : 1,
               categories : this.state.sub_categories,
             products : this.state.sub_products}); 
                  })
                  .catch((error) => {
                    console.error(error);
                  });
                 
             }}
                >
                  <Text>Buy from this category</Text></Button>
              </Body>
             
              
            </ListItem>
          </List>
            );
          })}
        <Separator bordered>
            <Text>FEATURED PRODUCTS</Text>
          </Separator>
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


