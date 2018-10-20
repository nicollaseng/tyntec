import React, { Component } from "react";
import { Container } from "native-base";
import { Image, StyleSheet } from "react-native";

class Header extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Image
          source={require("../img/logo.png")}
          style={styles.imageStyle}
        />
      </Container>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  imageStyle: {
    width: 380,
    height: 380
  }
});
