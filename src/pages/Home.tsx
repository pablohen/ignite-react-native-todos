import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTaskTitle: string) => {
    const occurences = tasks.find((task) => task.title === newTaskTitle);

    if (!!occurences) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome.'
      );
      return;
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTaskDone = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }

      return task;
    });
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (id: number) => {
    const removeTask = () => {
      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks(filteredTasks);
    };

    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => {},
        },
        {
          text: 'Sim',
          onPress: removeTask,
        },
      ]
    );
  };

  const handleEditTask = (taskId: number, taskNewTitle: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.title = taskNewTitle;
      }

      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
