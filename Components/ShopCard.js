import React, { Component } from "react";
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,} from "native-base";

export default function ShopCart(props) {
  return (
    <Card>
      <CardItem>
        <Left>
          {/* <Thumbnail source={{ uri: props.image }} /> */}
          <Body>
            <Text>{props.shop_id}</Text>
            <Text note>Shop Score:{props.shop_score}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Button full success>
          <Text>Buy From this Shop</Text>
        </Button>
      </CardItem>
    </Card>
  );
}
