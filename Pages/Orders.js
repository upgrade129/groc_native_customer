import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, ScrollableTab, Content ,Button,Icon,Left,Body,Right,Title} from 'native-base';
import Orders_Accepted from "../Pages/Orders_Accepted";
import Orders_Rejected from "../Pages/Orders_Rejected";
import Orders_Pending from "../Pages/Orders_pending";
import Orders_Cancelled from "../Pages/Orders_cancelled";
import AppBar from "../Components/AppBar";
import BottomTab_1 from "../Components/BottomTab_1";
export default class TabsScrollableExample extends Component {
  render() {
    return (
      <Container>
        <Header>
        <Left>
        <Button iconLeft onPress={()=>this.props.navigation.goBack()}>
          <Icon name='arrow-back' />
  
        </Button>
        </Left>
        <Body>
       
        <Right ><Title>Groc......</Title></Right>
        </Body>
        </Header>
        
        <Content>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
        <Tab heading="Pending Orders">
            <  Orders_Pending/>
          </Tab>
          
          <Tab heading="Accepted Orders">
            < Orders_Accepted/>
          </Tab>
          <Tab heading="Rejected Orders">
            <Orders_Rejected />
          </Tab>
          <Tab heading="Cancelled Orders">
         <Orders_Cancelled />
          </Tab>
         
        </Tabs>
        </Content>
        <BottomTab_1 
        navigation={this.props.navigation}
        activeTabIcon = "orders" />
      </Container>
    );
  }
}