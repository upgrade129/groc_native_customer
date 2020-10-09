// import React, { Component } from "react";
// import {
//   Container,
//   Content,
//   Textarea,
//   Form,
//   Item,
//   Text,
//   Icon,
//   Input,
//   Header,
//   Body,
//   Right,
//   Card,
//   CardItem,
//   Label,
//   Footer,
//   Picker,
//   FooterTab,
//   DatePicker,
//   Button,
//   Left,
// } from "native-base";
// import { useState } from "react";
// import axios from "axios";
// import { StyleSheet } from "react-native";
// import ViewOrdersBottomTab from "../../components/Orders/ViewOrdersBottomTab";
// import ViewOrderHeader from "../../components/Orders/ViewOrderHeader";
// import ViewOrderMessageViewer from "../../components/Orders/ViewOrderMessageViewer";
// import ViewOrderOrderedItemsViewer from "../../components/Orders/ViewOrderOrderedItemsViewer";
// import ViewOrderCardComponent from "../../components/Orders/ViewOrderCardComponent";
// import ViewOrderLoading from "../../components/Orders/ViewOrderLoading";
// import ErrorOccured from "../../components/ErrorOccured";
// import { useQuery, gql } from "@apollo/client";

// function test({ route, navigation }) {
//   const { from } = route.params;
//   const { id } = route.params;
//   const GET_SINGLE_ORDER = gql`
//     query GET_SINGLE_ORDER($orderID: ID!) {
//       order(id: $orderID) {
//         id
//         order_type
//         order_status
//         ordered_items {
//           price
//           quantity
//           product {
//             name
//           }
//         }
//         estimated_order_delivery
//         price
//         user {
//           username
//         }
//         messages {
//           from
//           text
//         }
//       }
//     }
//   `;

//   const { loading, error, data, refetch } = useQuery(GET_SINGLE_ORDER, {
//     variables: { orderID: id },
//   });

//   const styles = StyleSheet.create({
//     container: {
//       backgroundColor: "black",
//     },
//     cardHeader: {
//       backgroundColor: "black",
//     },
//     cardHeaderText: {
//       fontSize: 15,
//       fontWeight: "bold",
//       color: "white",
//     },
//   });

//   // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   // const showDatePicker = () => {
//   //   setDatePickerVisibility(true);
//   // };

//   // const hideDatePicker = () => {
//   //   setDatePickerVisibility(false);
//   // };

//   // const handleConfirm = (date) => {
//   //   console.warn("A date has been picked: ", date);
//   //   hideDatePicker();
//   // };
//   // const setDate = (newDate) => {
//   //   console.log(newDate);
//   // };

//   // if (loading) {
//   //   return <ViewOrderLoading />;
//   // }
//   // if (error) {
//   //   console.log(JSON.stringify(error));
//   //   return <ErrorOccured />;
//   // }
//   return (
//     <Container>
//       {/* <ViewOrderHeader
//         username={data.order.user.username}
//         price={data.order.price}
//       /> */}
//       <Content>
//         {/* <ViewOrderCardComponent
//           heading="Order Status"
//           data={data.order.order_status}
//         />

//         <ViewOrderCardComponent
//           heading="Order Type"
//           data={data.order.order_type}
//         />

//         <ViewOrderOrderedItemsViewer
//           ordered_items={data.order.ordered_items}
//           price={data.order.price}
//         /> */}

//         {/* <ViewOrderMessageViewer
//           messages={data.order.messages}
//           orderID={data.order.id}
//           refetch={refetch}
//         /> */}

//         <Card style={styles.container}>
//           <CardItem header style={styles.cardHeader}>
//             <Text style={styles.cardHeaderText}>Select Delivery Time:</Text>
//           </CardItem>
//           <CardItem header style={styles.cardHeader}>
//             {/* style={styles.cardHeaderText} <Input /> */}
//             {/* <DatePicker
//               defaultDate={new Date(2018, 4, 4)}
//               minimumDate={new Date(2018, 1, 1)}
//               maximumDate={new Date(2018, 12, 31)}
//               locale={"en"}
//               timeZoneOffsetInMinutes={undefined}
//               modalTransparent={false}
//               animationType={"fade"}
//               androidMode={"default"}
//               placeHolderText="Select date"
//               textStyle={{ color: "green" }}
//               placeHolderTextStyle={{ color: "#d3d3d3" }}
//               onDateChange={setDate}
//               disabled={false}
//             /> */}
//           </CardItem>
//         </Card>
//       </Content>

//       {/* <ViewOrdersBottomTab navigation={navigation} order_id={data.order.id} /> */}
//     </Container>
//   );
// }

// export default test;



ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);