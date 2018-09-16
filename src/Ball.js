import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';

 class Ball extends Component {

  componentWillMount() {
    this.position = new Animated.ValueXY(0.0);
    Animated.spring(this.position, {
      toValue: {x:Dimensions.get("window").width, y:Dimensions.get("window").height}
    }).start();
  }

  render() {
    var {ballStyle} = styles;
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={ballStyle}/>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  ballStyle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'red',
  }
});

export default Ball;