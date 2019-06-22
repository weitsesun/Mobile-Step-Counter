import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View } from "react-native";
import axios from 'axios';

export default class PedometerSensor extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    postSuccess: false
  };
  
  componentDidMount() {
    this._subscribe();
    // axios.get('http://3.17.24.167:3000/', (err, data) => {
    // })
    setInterval(this.sendData.bind(this), 2000);
  }

  sendData() {
    axios.post('http://3.17.24.167:3000/', { 
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
        <Text>
          Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
        </Text>
        <Text>
          Steps taken today: {this.state.pastStepCount}
        </Text>
        <Text style={{"fontSize":20}}>Walk! And watch this go up: {this.state.currentStepCount}</Text>
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