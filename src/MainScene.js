import React, { Component } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  Dimensions
} from "react-native";
import Header from "./Header";
import Stage from "./Stage";
import Score from "./Score";
import Modal from "react-native-modal";
import { Text, Icon } from "native-base";
import _ from "lodash";

class MainScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userSelection: " ",
      computerSelection: " ",
      result: "",
      visibleModal: true,
      counter: 99,
      start: false,
      playerScore: 0,
      computerScore: 0,
      tieScore: 0
    };
  }

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.modalText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  renderModalContent = () => {
    const { counter } = this.state;
    return (
      <View style={styles.mainContainer}>
        <Score score={this.props.score} />
        <View style={{ alignSelf: "flex-end", flex: 1, marginTop: 10 }}>
          <TouchableWithoutFeedback
            onPress={() => this.setState({ visibleModal: null })}
          >
            <Icon type="FontAwesome" name="close" color="#eee" />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 4 }}>
          <Text style={styles.titleText}>Made exclusively for </Text>
          <View style={{ alignItems: "center", padding: 20 }}>
            <Image
              source={require("../img/tyntecLogo.jpg")}
              style={styles.tyntecLogo}
            />
          </View>
        </View>
        <View>
          <Text style={styles.titleText}> By Nicollas Linhares</Text>
        </View>
      </View>
    );
  };

  counterModal() {
    const { playerScore, computerScore, tieScore } = this.state;
    return (
      <View style={[styles.mainContainer, { flex: 0.7 }]}>
        <Score score={this.props.score} />
        <View style={{ alignSelf: "flex-end", flex: 0.5, marginTop: 10 }}>
          <TouchableWithoutFeedback
            onPress={() => this.setState({ visibleModal: null })}
          >
            <Icon type="FontAwesome" name="close" color="#eee" />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 4 }}>
          <Text style={styles.scoreText}>Score: </Text>
          <Text style={styles.titleText}>You:</Text>
          <Text
            style={styles.subScoreText}
          >{`${playerScore} of 100 games`}</Text>
          <Text style={styles.titleText}>Computer:</Text>
          <Text
            style={styles.subScoreText}
          >{`${computerScore} of 100 games`}</Text>
          <Text style={styles.titleText}>Tie:</Text>
          <Text style={styles.subScoreText}>{`${tieScore} of 100 games`}</Text>
        </View>
        {/* <View>
          <Text style={styles.titleText}> By Nicollas Fulano</Text>
        </View> */}
      </View>
    );
  }

  manageState(userSelection) {
    const { start, counter, playerScore, computerScore, tieScore } = this.state;
    start
      ? this.setState({ counter: counter - 1 })
      : this.setState({ visibleModal: true, start: true });
    _.last(counter.toString()) == 0
      ? this.setState({ visibleModal: true })
      : null;

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
      color:
        res === "Match" ? "#f7c102" : res === "You Won" ? "#17c8e3" : "red",
      playerScore: res === "You Won" ? playerScore + 1 : playerScore,
      computerScore: res === "Game Over" ? computerScore + 1 : computerScore,
      tieScore: res === "Match" ? tieScore + 1 : tieScore
    });
  }

  render() {
    const { counter, start } = this.state;
    const resultColor = {
      color: this.state.color
    };
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          backgroundColor: "white"
        }}
      >
        <Modal
          isVisible={this.state.visibleModal}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          {!start ? this.renderModalContent() : this.counterModal()}
        </Modal>
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
      </View>
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
    marginBottom: 10,
    fontFamily: "Carter One"
  },
  rock: {
    backgroundColor: "#ea2d87",
    color: "#fff",
    fontSize: 22,
    padding: 10,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Carter One"
  },
  scissors: {
    color: "#fff",
    backgroundColor: "#17c8e3",
    fontSize: 22,
    padding: 10,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Carter One"
  },
  paper: {
    color: "#fff",
    backgroundColor: "#f7c102",
    fontSize: 22,
    padding: 10,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Carter One"
  },
  mainContainer: {
    flex: 1.0,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 26
  },
  shield: {
    width: 280,
    height: 280
  },
  tyntecLogo: {
    width: 200,
    height: 200,
    resizeMode: "contain"
  },
  titleText: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Carter One",
    padding: 15,
    color: "#f7c102"
  },
  scoreText: {
    fontSize: 45,
    textAlign: "center",
    fontFamily: "Carter One",
    color: "#ea2d87"
  },
  subScoreText: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Carter One",
    color: "#17c8e3"
  },
  infoText: {
    fontSize: 16,
    paddingVertical: 15,
    textAlign: "justify",
    fontFamily: "Carter One"
  },
  continueButton: {
    marginTop: 60
  },
  textButton: {
    fontSize: 20,
    fontFamily: "Carter One"
  }
});
