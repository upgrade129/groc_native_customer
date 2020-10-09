import React, { Component } from "react";
import { Card, CardItem, Content, Text } from "native-base";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Progressive,
} from "rn-placeholder";

export default function ErrorOccured(props) {
  return (
    <Content>
      <SingleOrderCardLoading />
      <Card>
        <CardItem style={{ backgroundColor: "red" }}>
          <Text style={{ color: "white",fontSize:20,fontWeight:"bold" }}>Some Error Occured</Text>
        </CardItem>
      </Card>
      <SingleOrderCardLoading />
      <SingleOrderCardLoading />
      <SingleOrderCardLoading />
      <SingleOrderCardLoading />
    </Content>
  );
}

function SingleOrderCardLoading(props) {
  return (
    <Card>
      <CardItem>
        <Placeholder Animation={Progressive}>
          <PlaceholderLine width={70} style={{ backgroundColor: "red" }} />
          <PlaceholderLine width={50} style={{ backgroundColor: "red" }} />
          <PlaceholderLine width={80} style={{ backgroundColor: "red" }} />
          <PlaceholderLine width={30} style={{ backgroundColor: "red" }} />
        </Placeholder>
      </CardItem>
    </Card>
  );
}