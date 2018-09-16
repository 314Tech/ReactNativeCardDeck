/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  SafeAreaView, 
  View,
  Text
} from 'react-native';
import Deck from './src/Deck';
import {
  Card, 
  Button,
  Icon
} from 'react-native-elements'

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

type Props = {};
export default class App extends Component<Props> {

  renderNoMoreCards(resetIndex) {
    const {noMoreCardContainerStyle} = styles;

    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon
          style
          raised
          name='refresh'
          type='font-awesome'
          color='#f50'
          onPress={resetIndex()}
        />
      </View>
    )
  }

  renderCard(item) {
    const {cardContainerStyle} = styles;

    return (
      <Card
        title={item.text}
        image={{uri: item.uri}}
        key={item.id}
        containerStyle={cardContainerStyle}
      >
        <Text style= {{marginBottom: 10}}>
          We can customize the card more
        </Text>
        <Button
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
            title='View Now'
        />
      </Card>
    )
  }
  render() {
    const {containerStyle} = styles;
    
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={containerStyle}>
         <Deck
            data={DATA}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderNoMoreCards}
         />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cardContainerStyle: {
    shadowColor: "grey",
    shadowOffset: {width: 1,height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  noMoreCardContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  containerStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
