import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  messageBox: {
    borderRadius: 10,
    minWidth: 200,
    maxWidth: 600,
    borderWidth: 0,
    elevation: 8,
  },
  message: {
    textAlign: 'center',
    margin: 20,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  firstButton: {
    borderBottomLeftRadius: 10,
  },
  lastButton: {
    borderBottomRightRadius: 10,
  },
  divider: {
    backgroundColor: '#D4D4D6',
  },
  titleText: {
    textAlign: 'center',
    margin: 10,
  },
  titleContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
