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
  Label,
  Item,
  Input,
  Segment,
  Card,
  CardItem,
  Thumbnail,
} from "native-base";
import {StyleSheet} from "react-native"

export default function ViewOrderCardComponent({ heading, data }) {
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
        <Text style={styles.cardHeaderText}>{heading}</Text>
      </CardItem>
      <CardItem>
        <Text>{JSON.stringify(data)}</Text>
      </CardItem>
    </Card>
  );
}