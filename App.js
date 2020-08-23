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
import ProductCard from "./Components/ProductCard";
import BottomTab from "./Components/BottomTab";
import AppBar from "./Components/AppBar"

export default class App extends Component {
  constructor(props) {
    super(props);
    // Initialize empty state here
    this.state = {
      products: [],
    };
  }
  componentWillMount() {
    // It's best to use your api call on componentWillMount
    this.getProducts();
  }

  getProducts() {
    fetch("https://groc-api.herokuapp.com/products")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          products: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <Container>
        <AppBar/>
        <Content>
          {this.state.products.map((product, i) => {
            return (
              <ProductCard
                image={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                unit={product.unit}
              />
            );
          })}
        </Content>
        <BottomTab/>
      </Container>
    );
  }
}
