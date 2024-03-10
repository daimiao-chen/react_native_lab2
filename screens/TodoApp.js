import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';

// or any pure javascript modules available in npm
import { Title, Paragraph, Card, Button, TextInput, RadioButton } from 'react-native-paper';
import { FontAwesome as Icon } from '@expo/vector-icons';

// Import Redux and React Redux Dependencies
import { connect } from 'react-redux';
import { setTodo } from '../redux/actions';

import { addTask, deleteTask, updateTask, getTasks } from '../firebase/firebase';

const TodoApp = ({ todo_list, setTodo }) => {
  const [task, setTask] = React.useState('');
  const [enableAdd, setEnableAdd] = React.useState(false);

  const handleAddTodo = () => {
    addTask(task)
    setTask('')
  }

  const handleDeleteTodo = (id) => {
    deleteTask(id)
  }

  const updateTodoStatus = (id, taskStatus) => {
    console.log(id, taskStatus);
    updateTask(id, taskStatus)
  }

  const handleEnableAdd = () => {
    setEnableAdd(task.length > 0 ? true : false)
  }

  React.useEffect(() => {
    handleEnableAdd()
  }, [task])

  React.useEffect(() => {
    getTasks((data) => {setTodo(data)})
  }, [])

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>ToDo App with React Native and Redux</Text>
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
          <Title>Add ToDo Here</Title>
          
          <TextInput
            mode="outlined"
            label="Task"
            value={task}
            onChangeText={task => setTask(task)}
          />
          <Spacer/>
          <Button mode="contained" onPress={handleAddTodo} disabled={!enableAdd} >
            Add Task
          </Button>
        </Card.Content>
      </Card>
      <Spacer />
      <FlatList
        data={todo_list}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          console.log(item);
          var cardStyle = {};
          if (item.taskStatus == 'due') {
            cardStyle = styles.dueTask;
          } else if (item.taskStatus == 'done') {
            cardStyle = styles.doneTask;
          } else {
            cardStyle = styles.delayTask;
          }
          
          return (
            <>
            <Card style={cardStyle}>
              <Card.Title
                title={`#${item.id}`}
                left={(props) => <Icon name="tasks" size={24} color="black" />}
                right={(props) => <ButtonIcon iconName="close" color="red" onPress={() => handleDeleteTodo(item.id)} />}
              />
              <Card.Content>
                <Text>{item.task} [{item.taskStatus}]</Text>
                <RadioButton.Group onValueChange={value => updateTodoStatus(item.id, value)} value={item.taskStatus} style={styles.radio}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <RadioButton.Item label="Due" value="due" />
                    <RadioButton.Item label="Done" value="done" />
                    <RadioButton.Item label="Delay" value="delay" />
                  </View>
                </RadioButton.Group>
              </Card.Content>
            </Card>
            <Spacer />
            </>
          );
        }}
      />
      <Spacer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dueTask: {
    backgroundColor: 'white'
  },
  doneTask: {
    backgroundColor: 'green'
  },
  delayTask: {
    backgroundColor: 'gray'
  },
  radio: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list,
  }
}

const mapDispatchToProps = { setTodo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
