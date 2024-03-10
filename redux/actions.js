import { ADD_TODO, DELETE_TODO, UPDATE_TODO, SET_TODO } from "./actionTypes";

export const addTodo = task => { 
  return { 
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    task
  } }
};

export const deleteTodo = id => ({
  type: DELETE_TODO,
  payload: {
    id
  }
});

export const updateTodo = (id, taskStatus) => {
  console.log(`updateTodo ${id}, ${taskStatus}`);
  return {
  type: UPDATE_TODO,
  payload: {
    id,
    taskStatus
  } }
};

export const setTodo = todo_list => {
  return {
  type: SET_TODO,
  payload: {
    todo_list
  } }
}

