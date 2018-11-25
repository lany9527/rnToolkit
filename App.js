/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Overlay from "./src/components/Overlay";

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    }
  }

  toggleOverlay = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    })
  };

  render() {
    const { isVisible } = this.state;
    return (
      <View style={styles.container}>
        <Button title="Toggle" onPress={() => this.toggleOverlay()}/>
        <Overlay isVisible={isVisible} onBackdropPress={() => this.toggleOverlay()}>
          <Text>Overlay</Text>
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
});
