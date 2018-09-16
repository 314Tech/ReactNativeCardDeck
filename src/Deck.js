import React, {Component} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
 } from 'react-native';
 
 const SCREEN_WIDTH = Dimensions.get('window').width;
 const SWIPE_THRESHHOLD = SCREEN_WIDTH * 0.25;
 const ANIMATION_DURATION = 250;

 class Deck extends Component {
  
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    renderCard: () => {},
    data: []  
  }

  constructor(props) {
    super(props);

    const resetPosition = this.resetPosition.bind(this);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({x: gesture.dx})
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHHOLD) {
          console.log(`RIGHT: ${gesture.dx}`);
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHHOLD) {
          console.log(`LEFT: ${gesture.dx}`);
          this.forceSwipe('left');
        } else {
          console.log(`RESET: ${gesture.dx}`);
          this.resetPosition();
        }
      }
    })

    this.state = {
      index: 0,
      panResponder,
      position
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({index: 0});
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  forceSwipe(direction) {
    const x = (direction === 'right') ? SCREEN_WIDTH : -SCREEN_WIDTH;

    Animated.timing(this.state.position, {
      toValue: {x, y: 0},
      duration: ANIMATION_DURATION
    }).start(() => {this.onSwipeComplete(direction)});
  }

  resetPosition() {
    const {position} = this.state;

    Animated.spring(position,{
      toValue: {x: 0, y: 0}
    }).start();
  }

  onSwipeComplete(direction) {
    const {data, onSwipeLeft, onSwipeRight} = this.props;
    const {index, position} = this.state;

    const item = data[index];

    this.setState({index: index + 1});
    position.setValue({x: 0,y: 0});
    (direction === 'right') ? onSwipeRight(item) : onSwipeLeft(item) 
  }

  getCardStyle() {
    const {position} = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })
    return {
      ...position.getLayout(),
      transform: [{rotate}]
    }
  }

  resetIndex() {
//    this.setState({index: 0});
  }

  renderCards() {
    const {index} = this.state;
    const {data, renderNoMoreCards} = this.props;
    const {cardDeckStyle} = styles;

    if (index >= data.length) {
      return renderNoMoreCards(this.resetIndex);
    } else {
      var list = this.props.data.map( (item, i) => {
        if (i< index) {
          return null;
        }
        if (i === index ) {
          return (
            <Animated.View
              style={[cardDeckStyle, this.getCardStyle()]}
              {...this.state.panResponder.panHandlers}
              key = {i}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          )
        } else {
          return ( 
            <Animated.View
                style = {[cardDeckStyle, {top: 10*(i-index), left: 10*(i-index)}]}
                key = {i}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          )
        }
      })
      var reverse = list.reverse();
      return reverse;
    }
  }
  render() {
    return (
        <View>
           {this.renderCards()}
        </View>
    )
  }
 }

 const styles = StyleSheet.create({
   cardDeckStyle: {
     position: 'absolute',
     width: SCREEN_WIDTH
   }
 })
 export default Deck;