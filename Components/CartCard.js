import React, { Component } from "react";
import {  Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,} from "native-base";
export default function CartCard(props) {
  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail source={{ uri: props.image }} />
          <Body>
            <Text>{props.name}</Text>
            <Text note>
              Price:{props.price}/{props.quantity}
              {props.unit}
            </Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Text>Add To Cart</Text>
          </Button>
        </Left>
        <Body>
          <Button transparent>
            <Icon active name="chatbubbles" />
            <Text>4 Comments</Text>
          </Button>
        </Body>
        <Right>
          <Button transparent>
            <Text>Add To Cart</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
}
