import React, { Component } from "react";
import { Container, Text } from "native-base";
import { Image, StyleSheet, View } from "react-native";

class Stage extends Component {
  jokenpo() {
    const { player, selectedOption } = this.props;
    if (selectedOption == "Rock") {
      return (
        <Container style={container}>
          <Text style={computerPlayer}>{player}</Text>
          <Image source={require("../img/rock.png")} />
        </Container>
      );
    } else if (selectedOption == "Paper") {
      return (
        <Container style={container}>
          <Text style={computerPlayer}>{player}</Text>
          <Image source={require("../img/paper.png")} />
        </Container>
      );
    } else if (selectedOption == "Scissors") {
      return (
        <View style={container}>
          <Text style={computerPlayer}>{player}</Text>
          <Image source={require("../img/scissors.png")} />
        </View>
      );
    } else {
      return false;
    }
  }
  render() {
    return <Container>{this.jokenpo()}</Container>;
  }
}

export default Stage;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
  },
  computerPlayer: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold"
  }
});

const { container, computerPlayer } = styles;
