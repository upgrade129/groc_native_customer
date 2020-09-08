import React, { Component } from "react";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
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

import ShopCard from "../Components/ShopCard";

export default class SelectShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops_data: [],
      ordered_items: [],
    };

    this.updateState = this.updateState.bind(this);
  }
  componentWillMount() {
    // It's best to use your api call on componentWillMount
    this.getData();
  }

  updateState(data) {
    this.setState({
      shops_data: data,
    });
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("local");
      var parsedJson = jsonValue != null ? JSON.parse(jsonValue) : null;

      console.log(parsedJson);

      this.setState({
        ordered_items: parsedJson,
      });

      var data = {};
      data["ordered_items"] = parsedJson;

      console.log(data);

      fetch("https://groc-api.herokuapp.com/find-best-shop", {
        method: "post",
        // mode: "no-cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(function (response) {
          return response.json();
        })
        .then((responseData) => {
          console.log(responseData.shop_product_id_array);
          this.setState({
            shops_data: responseData.shop_product_id_array,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      // error reading value
    }
  };

  render() {
    return (
      <Container>
        {/* <Text>{this.state.cart_items}</Text> */}
        <Content>
          {this.state.shops_data ? (
            this.state.shops_data.map((shop, i) => {
              return (
                <ShopCard
                  shop={shop.shop}
                  ordered_items={this.state.ordered_items}
                  shop_score={shop.shop_score}
                />
              );
            })
          ) : (
            <Text>Loading</Text>
          )}
        </Content>
        <Button full dark onPress={() => this.props.navigation.goBack()}>
          <Text>Go back</Text>
        </Button>
      </Container>
    );
  }
}
