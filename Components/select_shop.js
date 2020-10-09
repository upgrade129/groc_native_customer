import React, { Component } from "react";
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,} from "native-base";

import { AsyncStorage } from 'react-native';





export default class Select_shop extends Component {

  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
      shop_id:this.props.shop_id,
      
    };
  }

  storeshop_name=async(shop)=>{
    console.log("in",shop);
    try {
        var shop_id = shop;
        await AsyncStorage.setItem('shop_id', shop_id)
        console.log("shop_name stored in local storage");
      } catch (e) {
        // saving error
      }
    }

  render(){
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri:this.props.shop_image }} />
            <Body>
              <Text>{this.props.shop_name}</Text>
              <Text note>
                Ratings:{this.props.shop_ratings}
  
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Right>
            <Button  onPress={()=>{
              this.props.navigation.navigate("Shop_dashboard",
            {shop_name:this.props.shop_name});
            this.setState({shop_id : this.props.shop_id});
            this.storeshop_name(this.state.shop_id);
            
          }
  
            }>
              <Text>Buy from this shop</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
  
}
