import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View } from "react-native";
import axios from 'axios';

const POST_ADDR = 'http://3.14.88.26:3010/'

export default class PedometerSensor extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0
  };
  
  componentDidMount() {
    this._subscribe();
    setInterval(this.sendData.bind(this), 200);
  }

  sendData() {
    axios.post(POST_ADDR, { 
      pastStepCount: this.state.pastStepCount,
      currentStepCount: this.state.currentStepCount
  }).then(() => {
    this.setState({
      postSuccess: true
    });
  })
  .catch(() => {
    this.setState({
      postSuccess: false
    });
  })
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    // start.setDate(end.getDate() - 1);
    start.setHours(0,0,0,0);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{"fontSize":20}}>
          Previous walk: {this.state.pastStepCount}
        </Text>
        <Text style={{"fontSize":20}}>
          Current: {this.state.currentStepCount}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});

// Expo.registerRootComponent(PedometerSensor);