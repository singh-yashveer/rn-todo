import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderBottomColor: Colors.light,
    borderBottomWidth: 1,
  },
  taskText: {
    fontSize: 18,
    color: Colors.black,
  },
  deleteText: {
    color: Colors.red,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.black,
  },
});
