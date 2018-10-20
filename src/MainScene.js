import React, { Component } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Header from "./Header";
import Stage from "./Stage";
import { Container, Text } from "native-base";

class MainScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userSelection: " ",
      computerSelection: " ",
      result: ""
    };
  }

  manageState(userSelection) {
    const computerSelection = new Array();
    computerSelection[0] = "Rock";
    computerSelection[1] = "Scissors";
    computerSelection[2] = "Paper";
    var sort = Math.floor(Math.random() * 3);
    var res;

    if (userSelection === "Rock") {
      if (computerSelection[sort] === "Rock") {
        res = "Match";
      } else if (computerSelection[sort] === "Paper") {
        res = "Game Over";
      } else if (computerSelection[sort] === "Scissors") {
        res = "You Won";
      }
    }
    if (userSelection === "Paper") {
      if (computerSelection[sort] === "Rock") {
        res = "You Won";
      } else if (computerSelection[sort] === "Paper") {
        res = "Match";
      } else if (computerSelection[sort] === "Scissors") {
        res = "Game Over";
      }
    }
    if (userSelection === "Scissors") {
      if (computerSelection[sort] === "Rock") {
        res = "Game Over";
      } else if (computerSelection[sort] === "Paper") {
        res = "You Won";
      } else if (computerSelection[sort] === "Scissors") {
        res = "Match";
      }
    }

    this.setState({
      userSelection,
      computerSelection: computerSelection[sort],
      result: res,
      color: res === "Match" ? "#f7c102" : res === "You Won" ? "#17c8e3" : "red"
    });
  }

  render() {
    const resultColor = {
      color: this.state.color
    };
    return (
      <Container style={{ justifyContent: "space-around" }}>
        <Header />
        <View sytle={styles.buttonPanel}>
          <View>
            <TouchableWithoutFeedback onPress={() => this.manageState("Rock")}>
              <Text style={styles.rock}> Rock </Text>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <TouchableWithoutFeedback onPress={() => this.manageState("Paper")}>
              <Text style={styles.paper}> Paper </Text>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <TouchableWithoutFeedback
              onPress={() => this.manageState("Scissors")}
            >
              <Text style={styles.scissors}> Scissors </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={[styles.result, resultColor]}>{this.state.result}</Text>
          <Stage selectedOption={this.state.userSelection} player="You" />
          <Stage
            selectedOption={this.state.computerSelection}
            player="Computer"
          />
        </View>
      </Container>
    );
  }
}

export default MainScene;

const styles = StyleSheet.create({
  buttonPanel: {
    flex: 1,
    alignItems: "center"
  },
  result: {
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10
  },
  rock: {
    backgroundColor: "#ea2d87",
    color: "#fff",
    fontSize: 22,
    padding: 10,
    textAlign: "center",
    fontWeight: "500"
  },
  scissors: {
    color: "#fff",
    backgroundColor: "#17c8e3",
    fontSize: 22,
    padding: 10,
    textAlign: "center",
    fontWeight: "500"
  },
  paper: {
    color: "#fff",
    backgroundColor: "#f7c102",
    fontSize: 22,
    padding: 10,
    textAlign: "center",
    fontWeight: "500"
  }
});
