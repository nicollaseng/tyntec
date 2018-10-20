import React, { Component } from "react";
import { Container } from "native-base";
import { Image, StyleSheet, View } from "react-native";

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../img/logo.png")}
          style={styles.imageStyle}
        />
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    justifyContent: 'center'
  },
  imageStyle: {
    width: 300,
    height: 300
  }
});
