import React, { Component } from "react";
import { Text } from "native-base";
import { Image, StyleSheet, View } from "react-native";

class Score extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.scoreStyle}> {this.props.score} </Text>
      </View>
    );
  } 
}

export default Score;

const styles = StyleSheet.create({
//   container: {
//     flex:1,
//     alignSelf: 'flex-end'
//   },
 scoreStyle: {
     fontSize: 20,
     color: 'red',
 }
});
