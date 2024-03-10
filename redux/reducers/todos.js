import { ADD_TODO, DELETE_TODO, UPDATE_TODO, SET_TODO } from "../actionTypes";
import { addTask, deleteTask, updateTask } from "../../firebase/firebase";

const initialState = {
  todo_list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, task } = action.payload
      return {
        ...state,
        todo_list: [ ...state.todo_list, { id, task, taskStatus: 'due' }]
      };
    }
    case DELETE_TODO: {
      const { id } = action.payload
      return {
        ...state,
        todo_list: state.todo_list.filter((todo) => todo.id != id)
      };
    }
    case UPDATE_TODO: {
      console.log(action.payload)
      const { id, taskStatus } = action.payload
      return {
        ...state,
        todo_list: state.todo_list.map((todo) => {
          if (todo.id == id) {
            return { ...todo, taskStatus }
          }
          return todo
        })
      };
    }
    case SET_TODO: {
      const { todo_list } = action.payload
      console.log('SET_TODO');
      console.log(todo_list);
      console.log(state);
      console.log("finished SET_TODO");
      return {
        ...state,
        todo_list
      };
    }
    default:
      return state;
  }
}
