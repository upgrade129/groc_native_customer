import React, { Component } from "react";
import {
  Card,
  CardItem,
  Content,
  Header,
  Body,
  Right,
  Text,
  Footer,
  Container,
} from "native-base";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Progressive,
} from "rn-placeholder";
import { StyleSheet } from "react-native";

export default function OrderCardLoading(props) {
  return (
    <Container>
      <Header></Header>
      <Content>
        <SingleOrderCardLoading />
        <SingleOrderCardLoading />
        <SingleOrderCardLoading />
        <SingleOrderCardLoading />
      </Content>
    </Container>
  );
}

function SingleOrderCardLoading(props) {
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
      <CardItem header style={styles.cardHeader}></CardItem>
      <CardItem>
        <Placeholder Animation={Progressive}>
          <PlaceholderLine width={70} />
          <PlaceholderLine width={50} />
          <PlaceholderLine width={80} />
          <PlaceholderLine width={30} />
        </Placeholder>
      </CardItem>
    </Card>
  );
}