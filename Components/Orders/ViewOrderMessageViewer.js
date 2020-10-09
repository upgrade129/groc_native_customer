import React, { Component, useState } from "react";
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
import axios from "axios";
import { StyleSheet } from "react-native";

export default function ViewOrderMessageViewer({ messages, orderID, refetch }) {
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

  const [message, setMessage] = useState("");

  const [buttonText, setButtonText] = useState("Send Message");
  const [disableButton, setDisableButton] = useState(true);
  return (
    <Card style={styles.container}>
      <CardItem header style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>Messages</Text>
      </CardItem>
      {messages.map((message, i) => {
        return (
          <CardItem>
            <Body>
              <Text>
                {message.from}:{message.text}
              </Text>
            </Body>
          </CardItem>
        );
      })}
      <CardItem>
        <Body>
          <Item stackedLabel>
            <Label>
              <Text>Your Message:</Text>
            </Label>
            <Input
              value={message}
              onChangeText={(text) => {
                setMessage(text);
                if (text == "") {
                  setDisableButton(true);
                } else {
                  setDisableButton(false);
                }
              }}
            />
          </Item>
        </Body>
      </CardItem>
      <CardItem footer>
        <Body>
          <Button
            full
            disabled={disableButton}
            onPress={() => {
              setButtonText("Sending Message");
              let newMessages = messages.map((obj) => ({
                id: obj.id,
                from: obj.from,
                text: obj.text,
              }));
              var data = {
                from: "shop",
                text: message,
              };
              newMessages.push(data);
              var postData = {
                messages: newMessages,
              };

              axios
                .put(
                  `https://groc-api.herokuapp.com/orders/${orderID}`,
                  postData
                )
                .then((response) => {
                  setButtonText("Message Sent");
                  setMessage("");
                  // setData(newMessages);

                  setInterval(function () {
                    setButtonText("Send Message");
                  }, 3000);

                  console.log("Success", response);
                  refetch();
                })
                .catch((error) => {
                  // Handle error.
                  console.log("An error occurred:", error.response);
                });
            }}
          >
            <Text>{buttonText}</Text>
          </Button>
        </Body>
      </CardItem>
    </Card>
  );
}