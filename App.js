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
        <Header>
          <Left />
          <Body>
            <Title>Groc</Title>
          </Body>
          <Right />
        </Header>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search products" />
          </Item>
        </Header>
        <Content>
          {this.state.products.map((product, i) => {
            return (
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: product.image }} />
                    <Body>
                      <Text>{product.name}</Text>
                      <Text note>
                        Price:{product.price}/{product.quantity}
                        {product.unit}
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
          })}
        </Content>
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
      </Container>
    );
  }
}
