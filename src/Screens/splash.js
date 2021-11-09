import React, { Component } from 'react';
import { get_data } from "../../utilis/AsyncStorage/Controller";
import {
  View,
  StyleSheet,
  Image
} from 'react-native';
export default class splashScreen extends Component {
  constructor(props) {
    super(props);

  }
  async componentDidMount() {
    setTimeout(async () => {
      let data = await get_data("USER");
      if (data !== null) {
        this.props.navigation.replace('Calender')
      } else {
        this.props.navigation.replace('Login')
      }
    }, 1500);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/Logo1.png')}
          style={{ width: 160, height: 130 }}
        />
      </View>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ceebb5',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});