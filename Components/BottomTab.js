import React, { Component } from "react";
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

export default function BottomTab(props) {
  return (
    <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="apps" />
              <Text>Home</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Orders</Text>
            </Button>
            <Button vertical>
              <Icon name="navigate" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
  );
}
