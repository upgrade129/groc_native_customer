import React, { Component,useState } from "react";
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
  Toast,
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
import {StyleSheet} from "react-native"

export default function ViewOrderOrderedItemsViewer({ ordered_items,price }) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
    },
    cardHeader: {
      backgroundColor: "black",
    },
    cardHeaderText: {
      fontSize: 15,
      fontWeight: "bold",
      color: "white",
    },
  });

  return (
    <Card style={styles.container}>
      <CardItem header style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>Items Ordered</Text>
      </CardItem>
      {ordered_items.map((ordered_item, i) => {
        return (
          <CardItem>
            <Left>
              <Text>{ordered_item.product.name}</Text>
            </Left>
            <Body>
              <Text>Quantity:{ordered_item.quantity}</Text>
            </Body>
            <Right>
              <Text>Price:{ordered_item.price}</Text>
            </Right>
          </CardItem>
        );
      })}

      <CardItem footer>
        <Text>Total Price:{JSON.stringify(price)}</Text>
      </CardItem>
    </Card>
  );
}