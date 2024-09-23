import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    fontSize: 16,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
  },
});
