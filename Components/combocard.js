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
      mrp_price:this.props.mrp_price,
      offer_price:this.props.offer_price,
      combo_items:this.props.combo_items,
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
   
      return (
        <Card key={this.state.name}>
          
          <CardItem header >
              <Text>{this.state.name}</Text>
            </CardItem>
            <CardItem>
              <Body>
                  {this.state.combo_items.map((item,i) => {
                      return(
                          <Text>
                            {item.product.name}  Quantity:{item.quantity}  price:{item.price}
                          </Text>
                      );
                  
                  })}
                <Text>
                  
                </Text>
              </Body>
            </CardItem>
            <CardItem  bordered>
      <Text>Original price : {this.state.mrp_price}</Text>
      <Text>Discounted price : {this.state.offer_price}</Text>
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
                  "price": this.state.offer_price,
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

