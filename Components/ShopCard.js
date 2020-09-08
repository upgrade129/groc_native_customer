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

export default function ShopCart(props) {
  return (
    <Card>
      <CardItem>
        <Left>
          {/* <Thumbnail source={{ uri: props.image }} /> */}
          <Body>
            <Text>Shop Name:{props.shop.shop_name}</Text>
            <Text>Ratings:{props.shop.ratings}</Text>
            <Text note>Shop Score:{props.shop_score}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Button
          full
          success
          onPress={() => {


          //   [
          //     {
          //         "order_status": "Pending",
          //         "ordered_items": [
          //             {
          //                 "image": "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/carrots.jpg",
          //                 "name": "Carrot",
          //                 "price": 20,
          //                 "id": "5f317f6227b9d004ac3313b2",
          //                 "quantity": 3
          //             }
          //         ],
          //         "user_id": "5f2bfeab086ac71228d7db22",
          //         "shop_id": "5f392e2a7b25630017007fec",
          //         "user_name": "test user2",
          //         "estimated_price": 500
          //     }
          // ]
          

            var data={}
            data["order_status"]="Pending";
            data["user_id"]="5f2bfeab086ac71228d7db22"
            data["shop_id"]=props.shop.id
            data["user_name"]="Prem"

            fetch("https://groc-api.herokuapp.com/orders", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
            .then(function (response) {
              return response.json();
            })
            .then((responseData) => {
              console.log(responseData);
            })
            .catch((error) => {
              console.error(error);
            });
          }}>
          <Text>Buy From this Shop</Text>
        </Button>
      </CardItem>
    </Card>
  );
}
