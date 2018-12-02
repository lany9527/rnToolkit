import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import styles from './Overlay.style';
import { ViewPropTypes } from '../../config/index';

const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;
const windowHeight = dimensions.height;

export default class Overlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.spin();
  }

  spin() {
    const { spinValue } = this.state;
    spinValue.setValue(0.3);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible === false) {
      const { spinValue } = this.state;
      Animated.timing(spinValue, {
        toValue: 0,
        duration: 250,
        easing: Easing.linear,
      }).start();
    }
    if (nextProps.isVisible === true) {
      this.spin();
    }
  }

  render() {
    const { spinValue } = this.state;

    const {
      children,
      isVisible,
      containerStyle,
      overLayStyle,
      windowBackgroundColor,
      overlayBackgroundColor,
      onBackdropPress,
      onSubmit,
      borderRadius,
      width,
      height,
      fullScreen,
      ...rest
    } = this.props;
    if (!isVisible) return null;
    return (
      <TouchableWithoutFeedback onPress={onBackdropPress}>
        <Animated.View
          style={StyleSheet.flatten([
            styles.container,
            {
              backgroundColor: windowBackgroundColor,
              opacity: spinValue,
            },
            containerStyle,
          ])}
          {...rest}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={StyleSheet.flatten([
                styles.overlay,
                {
                  borderRadius,
                  backgroundColor: overlayBackgroundColor,
                  width,
                  height,
                  opacity: spinValue,
                  transform: [{ scale: spinValue }],
                },
                fullScreen && { width: windowWidth, height: windowHeight },
                overLayStyle,
              ])}
            >
              {children}
              <View style={styles.btnView}>
                <TouchableOpacity style={[styles.btn, styles.cancelBtn]} onPress={() => onBackdropPress()}>
                  <Text style={styles.btnText}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.confirmBtn]} onPress={() => onSubmit()}>
                  <Text style={[styles.btnText, styles.confirmBtnText]}>确定</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

Overlay.propTypes = {
  children: PropTypes.any,
  isVisible: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  overlayStyle: ViewPropTypes.style,
  windowBackgroundColor: PropTypes.string,
  overlayBackgroundColor: PropTypes.string,
  onBackdropPress: PropTypes.func,
  borderRadius: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fullScreen: PropTypes.bool,
};

Overlay.defaultProps = {
  windowBackgroundColor: 'rgba(0,0,0,.4)',
  overlayBackgroundColor: '#fff',
  borderRadius: 10,
  width: windowWidth * 0.8,
  height: windowHeight * 0.4,
  onBackdropPress: () => null,
  onSubmit: () => null,
};
