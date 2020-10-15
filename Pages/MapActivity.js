// import React, { Component } from "react";

// //  import MapView from 'react-native-maps';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';

//   import Geocoder from 'react-native-geocoding';
//    import Geolocation from 'react-native-geolocation-service';

//   export default class LocationDemo extends Component {
//   constructor() {
//       super()
//       this.state = {
//           latitude: 0,
//           longitude: 0,
//           error: null,
//           Address: null
//       }
//   }

//   async componentDidMount() {
//       console.log("hii");
//       Geolocation.getCurrentPosition(
//           (position) => {
//               this.setState({
//                   latitude: position.coords.latitude,
//                   longitude: position.coords.longitude,
//               });
//               console.log("latitude",this.state.latitude);
//               console.log("longtude",this.state.longitude);


//     //           Geocoder.from(position.coords.latitude, position.coords.longitude)

//     //               .then(json => {
//     //                   console.log(json);

//     // var addressComponent = json.results[0].address_components;
//     //             this.setState({
//     //                      Address: addressComponent
//     //                   })
//     //                   console.log(addressComponent);
//     //               })
//     //               .catch(error => console.warn(error));
//     //       },

//     //       (error) => {
//     //           // See error code charts below.
//     //           this.setState({
//     //                   error: error.message
//     //               }),
//     //               console.log(error.code, error.message);
//     //       },

//     //       {
//     //           enableHighAccuracy: false,
//     //           timeout: 10000,
//     //           maximumAge: 100000
//     //       }
//              } );
//   }

//   render() {
//       return (
//         <View style={styles.container}>
//         <MapView style={styles.mapStyle}     
//         region={{          
//             latitude: this.state.latitude,          
//             longitude:  this.state.longitude,          
//             latitudeDelta: 0.0922,          
//             longitudeDelta: 0.0421        
//     }} />
//       </View>         
//        );

    
          
//     }
         
// }

      
  

//           const styles = StyleSheet.create({
//             container: {
//               flex: 1,
//               backgroundColor: '#fff',
//               alignItems: 'center',
//               justifyContent: 'center',
//             },
//             mapStyle: {
//               width: Dimensions.get('window').width,
//               height: Dimensions.get('window').height,
//             },
//           });



import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Dimensions,
  Linking
} from "react-native";
import MapView from 'react-native-maps';
export default class App extends Component {
  state = {
    location: null
  };

  

  url(){
    const latitude = "11.1018399";
    const longitude = "79.6522218";
    const label = "";
    
    const url = Platform.select({
      ios: "maps:" + latitude + "," + longitude + "?q=" + label,
      android: "geo:" + latitude + "," + longitude + "?q=" + label
    });
    Linking.openURL(url);
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    console.log(this.state.location);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.url}>
          <Text style={styles.welcome}>Find My Coords?</Text>
          <Text>Location: {this.state.location}</Text>
        </TouchableOpacity>
      </View>
    //    <View style={styles.container}>
    //             <MapView style={styles.mapStyle}     
    //             region={{          
    //                 latitude: this.state.location.coords.latitude,          
    //                 longitude:  this.state.location.coords.longitude,          
    //                 latitudeDelta: 0.0922,          
    //                 longitudeDelta: 0.0421        
    //         }} />
    //           </View>     
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    welcome: {
      fontSize: 20,
      textAlign: "center",
      margin: 10
    },
    instructions: {
      textAlign: "center",
      color: "#333333",
      marginBottom: 5
    },
    mapStyle: {
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height,
                    },
  });