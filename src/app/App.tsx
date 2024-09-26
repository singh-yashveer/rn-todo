import React, {useEffect, useState} from 'react';
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
import {loadTasks, saveTasks} from '../features/tasks/api/tasks';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() !== 'dark';
  const [todo, setTodo] = useState<string>('');
  const [tasks, setTasks] = useState<
    {id: string; title: string; completed: boolean}[]
  >([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [_loading, setLoading] = useState<boolean>(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const fetchTasks = async () => {
    setLoading(true);
    const storedTasks = await loadTasks();
    setTasks(storedTasks);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (todo.trim()) {
      setLoading(true);
      let updatedTasks;
      if (editingTaskId) {
        updatedTasks = tasks.map(task =>
          task.id === editingTaskId ? {...task, title: todo} : task,
        );
        setEditingTaskId(null);
      } else {
        updatedTasks = [
          ...tasks,
          {id: String(tasks.length + 1), title: todo, completed: false},
        ];
      }
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
      setLoading(false);
      setTodo('');
    }
  };

  const removeTask = async (id: string) => {
    setLoading(true);
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
    if (editingTaskId === id) {
      setEditingTaskId(null);
      setTodo('');
    }
    setLoading(false);
  };

  const updateTask = (id: string) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      setTodo(task.title);
      setEditingTaskId(id);
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? {...task, completed: !task.completed} : task,
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
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
          value={todo}
          onChangeText={setTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonLabel}>Add</Text>
        </TouchableOpacity>
      </View>
      <TaskList
        taskList={tasks}
        deleteTask={removeTask}
        updateTask={updateTask}
        toggleCompletion={toggleTaskCompletion}
      />
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
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: Colors.blue,
    padding: 10,
    borderRadius: 5,
    width: 60,
  },
  addButtonLabel: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 700,
  },
});

export default App;
