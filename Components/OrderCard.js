import React, { Component } from "react";
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,} from "native-base";

export default function OrderCard(props) {
  return (
    <Card>
      <CardItem>
        <Left>
          <Body>
            <Text>Rupees: {props.estimated_price}</Text>
            <Text note>
              {/* Total Items: {props.ordered_items.length} */}
            </Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Left>
          <Body>
            <Text>Shop: {props.shop_id}</Text>
            
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        
       
        <Right>
          <Button transparent onPress={()=>{
            props.navigation.navigate("OrderView",{
              id:props.order_id
            })
          }}>
            <Text>View Order</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
}
