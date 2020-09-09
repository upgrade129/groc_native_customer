import React, { Component } from "react";
import {   Container,  Header,  Title,  Content,  Footer,  FooterTab,  Button,  Left,  Right,  Body,  Icon,  Text,  Item,  Input,  Segment,  Card,  CardItem,  Thumbnail,Form,Picker} from "native-base";

export default class PickerPlaceholderExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      image: this.props.image,
      name:this.props.name,
      quantity:this.props.quantity,
      price:this.props.price,
      unit:this.props.unit,
      id:this.props.id,
      item_added:{},
      addtocart:this.props.added_items,
      button_text:"Add to cart",
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  render() {
    if(this.state.unit === "Kilogram")
    { 
      return (
        <Card key={this.state.name}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: this.state.image }} />
              <Body>
                <Text>{this.state.name}</Text>
                <Text note>
                  Price:{this.state.price}/{this.state.quantity}
                  {this.state.unit}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
           
          <Left>
          
            <Content>
              <Form>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Quantity"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="0" value="0" />
                  <Picker.Item label="50 gms" value="50 gms" />
                  <Picker.Item label="100 gms" value="100 gms" />
                  <Picker.Item label="200 gms" value="200 gms" />
                  <Picker.Item label="250 gms (or) 1/4 Kg" value="250 gms" />
                  <Picker.Item label="500 gms (or) 1/2 Kg" value="500 gms" />
                  <Picker.Item label="1 Kg" value="1 Kg" />
                  <Picker.Item label="2 Kg" value="2 Kg" />
                  <Picker.Item label="3 Kg" value="3 Kg" />
                  <Picker.Item label="4 Kg" value="4 Kg" />
                  <Picker.Item label="5 Kg" value="5 Kg" />
                  <Picker.Item label="10 Kg" value="10 Kg" />
                  <Picker.Item label="15 Kg" value="15 Kg" />
                  <Picker.Item label="20 Kg" value="20 Kg" />
                  <Picker.Item label="25 Kg" value="25 Kg" />
                  <Picker.Item label="50 Kg" value="50 Kg" />
                </Picker>
              </Form>
            </Content>
          
          </Left>  
           
           
            <Right>
              <Button transparent onPress={()=>{
                console.log("selected",this.state.selected);
                var data= {
                  "image": this.state.image,
                  "name": this.state.name,
                  "price": this.state.price,
                  "id": this.state.id,
                  "quantity": this.state.selected
                }
                // console.log("selected-items",this.state.item_added);
                this.state.addtocart(data);
                this.setState({button_text:'Product Added'});
            }}>
                <Text>{this.state.button_text}</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      );

    }
    else if(this.state.unit === "Gram"){
      return (
        <Card key={this.state.name}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: this.state.image }} />
              <Body>
                <Text>{this.state.name}</Text>
                <Text note>
                  Price:{this.state.price}/{this.state.quantity}
                  {this.state.unit}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
           
          <Left>
          
            <Content>
              <Form>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Quantity"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="0" value="0" />
                  <Picker.Item label="50 gms" value="50 gms" />
                  <Picker.Item label="100 gms" value="100 gms" />
                  <Picker.Item label="200 gms" value="200 gms" />
                  <Picker.Item label="250 gms (or) 1/4 Kg" value="250 gms" />
                  <Picker.Item label="500 gms (or) 1/2 Kg" value="500 gms" />
                  <Picker.Item label="600 gms " value="600 gms" />
                  <Picker.Item label="700 gms " value="700 gms" />
                  <Picker.Item label="750 gms (or) 3/4 Kg" value="750 gms" />
                  <Picker.Item label="800 gms " value="800 gms" />
                  <Picker.Item label="900 gms " value="900 gms" />
                  <Picker.Item label="1 Kg" value="1 Kg" />
                  <Picker.Item label="2 Kg" value="2 Kg" />
                  <Picker.Item label="3 Kg" value="3 Kg" />
                  <Picker.Item label="4 Kg" value="4 Kg" />
                  <Picker.Item label="5 Kg" value="5 Kg" />
                </Picker>
              </Form>
            </Content>
          
          </Left>  
           
           
            <Right>
              <Button transparent onPress={()=>{
                console.log("selected",this.state.selected);
                this.state.item_added = {
                  "image": this.state.image,
                  "name": this.state.name,
                  "price": this.state.price,
                  "id": this.state.id,
                  "quantity": this.state.selected
                }
                console.log("selected-items",this.state.item_added);
                this.state.addtocart(this.state.item_added);
                this.setState({button_text:'Product Added'});
            }}>
                <Text>{this.state.button_text}</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      );
    }
    else if(this.state.unit === "Litre"){
      return (
        <Card key={this.state.name}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: this.state.image }} />
              <Body>
                <Text>{this.state.name}</Text>
                <Text note>
                  Price:{this.state.price}/{this.state.quantity}
                  {this.state.unit}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
           
          <Left>
          
            <Content>
              <Form>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Quantity"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="0" value="0" />
                  <Picker.Item label="50 ml" value="50 ml" />
                  <Picker.Item label="100 ml" value="100 ml" />
                  <Picker.Item label="200 ml" value="200 ml" />
                  <Picker.Item label="250 ml (or) 1/4 Litre" value="250 ml" />
                  <Picker.Item label="500 ml (or) 1/2 Litre" value="500 ml" />
                  <Picker.Item label="750 ml (or) 3/4 Litre" value="750 ml" />
                  <Picker.Item label="1 Litre" value="1 Litre" />
                  <Picker.Item label="2 Litre" value="2 Litre" />
                  <Picker.Item label="3 Litre" value="3 Litre" />
                  <Picker.Item label="4 Litre" value="4 Litre" />
                  <Picker.Item label="5 Litre" value="5 Litre" />
                  <Picker.Item label="10 Litre" value="10 Litre" />
                </Picker>
              </Form>
            </Content>
          
          </Left>  
           
           
            <Right>
              <Button transparent onPress={()=>{
                console.log("selected",this.state.selected);
                this.state.item_added = {
                  "image": this.state.image,
                  "name": this.state.name,
                  "price": this.state.price,
                  "id": this.state.id,
                  "quantity": this.state.selected
                }
                console.log("selected-items",this.state.item_added);
                this.state.addtocart(this.state.item_added);
                this.setState({button_text:'Product Added'});
            }}>
                <Text>{this.state.button_text}</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      );


    }
    else{
      return (
        <Card key={this.state.name}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: this.state.image }} />
              <Body>
                <Text>{this.state.name}</Text>
                <Text note>
                  Price:{this.state.price}/{this.state.quantity}
                  {this.state.unit}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
           
          <Left>
          
            <Content>
              <Form>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Quantity"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="0" value="0" />
                  <Picker.Item label="1 piece" value="1 piece" />
                  <Picker.Item label="2 piece" value="2 piece" />
                  <Picker.Item label="3 piece" value="3 piece" />
                  <Picker.Item label="4 piece" value="4 piece" />
                  <Picker.Item label="5 piece" value="5 piece" />
                  <Picker.Item label="6 piece" value="6 piece" />
                  <Picker.Item label="7 piece" value="7 piece" />
                  <Picker.Item label="8 piece" value="8 piece" />
                  <Picker.Item label="9 piece" value="9 piece" />
                  <Picker.Item label="10 piece" value="10 piece" />
                </Picker>
              </Form>
            </Content>
          
          </Left>  
           
           
            <Right>
              <Button transparent onPress={()=>{
                console.log("selected",this.state.selected);
                this.state.item_added = {
                  "image": this.state.image,
                  "name": this.state.name,
                  "price": this.state.price,
                  "id": this.state.id,
                  "quantity": this.state.selected
                }
                console.log("selected-items",this.state.item_added);
                this.state.addtocart(this.state.item_added);
                this.setState({button_text:'Product Added'});
            }}>
                <Text>{this.state.button_text}</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      );
      
    }
    
  
}
}
