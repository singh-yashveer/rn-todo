import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

interface TaskListProps {
  taskList: string[];
  deleteTask: (index: number) => void;
}

function TaskList({taskList, deleteTask}: TaskListProps): React.ReactElement {
  return (
    <FlatList
      data={taskList}
      renderItem={({item, index}) => (
        <View style={styles.taskContainer}>
          <Text style={styles.taskText}>{item}</Text>
          <TouchableOpacity onPress={() => deleteTask(index)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(_, index) => index.toString()}
      ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet!</Text>}
    />
  );
}

export default TaskList;
