import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeInput} from '../shared/components/input';
import TaskList from '../features/tasks/TaskList/ui';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() !== 'dark';
  const [task, setTask] = useState<string>('');
  const [taskList, setTaskList] = useState<string[]>([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const addTask = () => {
    if (task.trim()) {
      setTaskList([...taskList, task]);
      setTask('');
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTasks);
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <NativeInput
          placeholder="Add a new task"
          placeholderTextColor={Colors.black}
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonLabel}>Add</Text>
        </TouchableOpacity>
      </View>
      <TaskList taskList={taskList} deleteTask={deleteTask} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 12,
    color: Colors.black,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: Colors.blue,
    padding: 10,
    borderRadius: 5,
  },
  addButtonLabel: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 700,
  },
});

export default App;
