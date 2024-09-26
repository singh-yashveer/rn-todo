import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  taskList: Task[];
  deleteTask: (id: string) => void;
  updateTask: (id: string) => void;
  toggleCompletion: (id: string) => void;
}

function TaskList({
  taskList,
  deleteTask,
  updateTask,
  toggleCompletion,
}: TaskListProps): React.ReactElement {
  return (
    <FlatList
      data={taskList}
      renderItem={({item}) => (
        <View style={styles.taskContainer}>
          <Text
            style={[
              styles.taskText,
              item.completed && styles.completedTaskText,
            ]}>
            {item.title}
          </Text>
          <View style={styles.functionsContainer}>
            <TouchableOpacity onPress={() => toggleCompletion(item.id)}>
              <Text style={styles.functionText}>
                {item.completed ? 'Undone' : 'Done'}
              </Text>
            </TouchableOpacity>

            {/* Edit Button */}
            <TouchableOpacity onPress={() => updateTask(item.id)}>
              <Text style={styles.functionText}>Edit</Text>
            </TouchableOpacity>

            {/* Delete Button */}
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.functionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={item => item.id}
      ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet!</Text>}
    />
  );
}

export default TaskList;
