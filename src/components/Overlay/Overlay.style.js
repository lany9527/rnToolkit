import { Dimensions, Platform, StyleSheet } from 'react-native';

const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;
const windowHeight = dimensions.height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    borderRadius: 10,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,.3)',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
      },
    }),
  },
  btnView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  btn: {
    height: 56,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  cancelBtn: {
    borderBottomLeftRadius: 10,
    borderRightColor: '#ddd',
    borderRightWidth: 1,
  },
  confirmBtn: {
    borderBottomRightRadius: 10,
  },
  btnText: {
    fontSize: 16,
    color: '#999',
  },
  confirmBtnText: {
    color: '#1296db',
  },
});

export default styles;
